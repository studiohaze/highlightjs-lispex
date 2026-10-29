import { createRequire } from 'node:module';
import vm from 'node:vm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'node:assert/strict';
import hljs from 'highlight.js/lib/core';
import lispex from '../dist/lispex.es.js';

hljs.registerLanguage('lispex', lispex);

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtureFolder = path.join(here, 'markup/lispex');
const expects = fs.readdirSync(fixtureFolder)
  .filter(name => name.endsWith('.expect.txt'))
  .map(name => path.join(fixtureFolder, name));
assert.ok(expects.length > 0, 'markup fixtures must be discovered');

describe('lispex', () => {
  expects.forEach((filename) => {
    const name = path.basename(filename, '.expect.txt');
    const skipped = name.endsWith('.skip');
    const run = skipped ? it.skip : it;
    run(`should markup ${name}`, () => {
      const source = fs.readFileSync(filename.replace(/\.expect/, ''), 'utf8');
      const expected = fs.readFileSync(filename, 'utf8');
      assert.equal(hljs.highlight(source, { language: 'lispex' }).value.trim(),
        expected.trim());
    });
  });
});

const require = createRequire(import.meta.url);
const complexSource = fs.readFileSync(path.join(here, 'detect/lispex/default.txt'), 'utf8');
const decode = html => html.replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&');

describe('lispex package formats and complete example', () => {
  const check = instance => {
    const result = instance.highlight(complexSource, { language: 'lispex' });
    assert.equal(result.illegal, false);
    assert.equal(result.errorRaised, undefined);
    assert.equal(decode(result.value), complexSource);
    for (const scope of ['comment', 'keyword', 'string', 'number']) {
      assert.ok(result.value.includes('hljs-' + scope), scope + ' must be recognized');
    }
  };
  it('highlights the complete CLI-verified example through ESM', () => check(hljs));
  it('loads the CommonJS build and extension alias', () => {
    const instance = hljs.newInstance();
    instance.registerLanguage('lispex', require('../dist/lispex.cjs'));
    assert.ok(instance.getLanguage('lspx'));
    check(instance);
  });
  it('loads the browser bundle without Node globals', () => {
    const instance = hljs.newInstance();
    vm.runInNewContext(fs.readFileSync(path.join(here, '../dist/lispex.js'), 'utf8'),
      { hljs: instance }, { timeout: 1000 });
    check(instance);
  });
});

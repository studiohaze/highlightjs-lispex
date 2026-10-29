import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const hljsVersion = require('highlight.js/package.json').version;
const banner = `/*! \`lispex\` grammar built and tested with Highlight.js ${hljsVersion} */\n`;

export default {
  input: 'src/languages/lispex.js',
  output: [
    {
      file: 'dist/lispex.es.js',
      format: 'es',
      banner
    },
    {
      file: 'dist/lispex.cjs',
      format: 'cjs',
      exports: 'default',
      banner
    },
    {
      file: 'dist/lispex.js',
      format: 'iife',
      name: 'hljsLispex',
      banner,
      footer: 'hljs.registerLanguage("lispex", hljsLispex);'
    }
  ]
};

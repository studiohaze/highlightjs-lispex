# Lispex grammar for Highlight.js

A syntax-highlighting grammar for [Lispex](https://www.lispex.com/), developed by STUDIO HAZE.

This package contains highlighting rules and public-language examples, not the
language implementation. It uses standard Highlight.js scopes, so existing
themes apply. This is syntax highlighting, not a language validator.

## Use from the repository

Install Highlight.js 11 and clone this grammar repository. The committed
`dist/` files can be used directly; a published npm version is not required.

```javascript
import hljs from 'highlight.js/lib/core';
import grammar from './dist/lispex.es.js';

hljs.registerLanguage('lispex', grammar);
console.log(hljs.highlight(source, { language: 'lispex' }).value);
```

CommonJS exports the grammar from `dist/lispex.cjs`. The browser bundle
`dist/lispex.js` registers itself on an already loaded global `hljs`.
The extension alias is `lspx`.

## Develop and test

```sh
npm ci
npm test
```

`npm test` builds ESM, CommonJS, and browser bundles, checks exact markup
fixtures, and loads the complete CLI-verified example through all three formats.
The test runner refuses to pass when it discovers no markup fixtures.
Commit the generated `dist/` files when changing the grammar.

## Syntax references

- [Official language site](https://www.lispex.com/)
- [Lexical rules](https://www.lispex.com/v1.21/en/docs/reference/reader-grammar)
- [Reserved/forbidden forms](https://www.lispex.com/v1.21/en/docs/reference/reserved-and-forbidden)
- [Exact numbers](https://www.lispex.com/v1.21/en/docs/manual/numbers)
- The complete example was run with official Lispex 1.21.1.

## License

MIT; see [LICENSE](LICENSE). The upstream grammar-template layout is also MIT.

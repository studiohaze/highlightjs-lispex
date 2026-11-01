# Lispex for Highlight.js

Syntax highlighting for [Lispex](https://www.lispex.com/), the Lisp from STUDIO HAZE. It uses the standard Highlight.js scopes, so every existing theme works.

## Install

```sh
npm install highlight.js highlightjs-lispex
```

## Use

```javascript
import hljs from 'highlight.js/lib/core';
import lispex from 'highlightjs-lispex';

hljs.registerLanguage('lispex', lispex);
const html = hljs.highlight(source, { language: 'lispex' }).value;
```

CommonJS works with `require('highlightjs-lispex')`. In a browser, load `dist/lispex.js` after Highlight.js and it registers itself on the global `hljs`. The alias `lspx` works too.

## Develop

```sh
npm ci
npm test
```

The tests build the ESM, CommonJS and browser bundles and compare the highlighted markup with the fixtures. Commit the rebuilt `dist/` files with any grammar change.

## Links

- [Lispex](https://www.lispex.com/)
- [Reader grammar](https://www.lispex.com/v1.21/en/docs/reference/reader-grammar)
- [Exact numbers](https://www.lispex.com/v1.21/en/docs/manual/numbers)

## License

MIT

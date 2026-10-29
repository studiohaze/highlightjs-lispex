/*! `lispex` grammar built and tested with Highlight.js 11.12.0 */

'use strict';

/*
Language: Lispex
Author: STUDIO HAZE
Description: Lispex application decision-rule language.
Website: https://www.lispex.com/
*/

function lispex(hljs) {
  const BLOCK_COMMENT = hljs.COMMENT(/#\|/, /\|#/, { contains: ['self'] });
  // Match whole atoms: +5 is a name, and radix/exactness prefixes are unsupported.
  const BOUNDARY = '[^\\s()\'`,;"]';
  const NUMBER = {
    scope: 'number',
    begin: new RegExp(`(?<!${BOUNDARY})-?(?:0|[1-9]\\d*)`
      + `(?:/[1-9]\\d*|(?:\\.\\d+)?(?:[eE][-+]?\\d+)?)?(?!${BOUNDARY})`),
    relevance: 0
  };
  return {
    name: 'Lispex',
    aliases: ['lspx'],
    keywords: {
      $pattern: /[^\s()'`,;"#]+/,
      keyword: 'quote quasiquote unquote unquote-splicing lambda if begin set! '
        + 'define let let* letrec cond case guard and or when unless do '
        + 'module export import',
      built_in: 'values call-with-values call/cc dynamic-wind + - * / = < > <= >= '
        + 'cons car cdr list map apply error error-object? error-object-message '
        + 'number? string? boolean? pair? null? vector vector-ref '
        + 'bytevector-u8-ref display newline'
    },
    contains: [
      BLOCK_COMMENT,
      hljs.COMMENT(/;/, /$/),
      {
        scope: 'string',
        begin: /#\\(?:x[\dA-Fa-f]+|[A-Za-z]+|[^\s])/
      },
      { scope: 'string', begin: /"/, end: /"/, contains: [hljs.BACKSLASH_ESCAPE] },
      { scope: 'literal', begin: /#(?:true|false|t|f)(?=$|[\s()'`,;"])/ },
      NUMBER,
      { scope: 'meta', begin: /#(?:u8)?(?=\()/, relevance: 0 },
      { scope: 'operator', begin: /,@|['`,]/, relevance: 0 }
    ]
  };
}

module.exports = lispex;

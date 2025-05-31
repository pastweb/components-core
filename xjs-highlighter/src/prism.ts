import Prism from 'prismjs';

// Extend JSX grammar for xjs/xts
Prism.languages.xjs = Prism.languages.extend('jsx', {
  // Override attribute-name to support :#directive, :@event, :data-binding
  'attribute-name': [
    // Directives: :# followed by any ASCII characters
    {
      pattern: /:#[!-~]+(?=\s*=\s*(?:"[^"]*"|'[^']*'|{[^}]*}))/,
      alias: 'directive',
      greedy: true,
    },
    // Event handlers: :@ followed by any ASCII characters
    {
      pattern: /:@[!-~]+(?=\s*=\s*(?:"[^"]*"|'[^']*'|{[^}]*}))/,
      alias: 'event-handler',
      greedy: true,
    },
    // Data bindings: : followed by any ASCII characters (excluding :# and :@)
    {
      pattern: /:(?![#@])[!-~]+(?=\s*=\s*(?:"[^"]*"|'[^']*'|{[^}]*}))/,
      alias: 'data-binding',
      greedy: true,
    },
    // Standard JSX attributes (for compatibility)
    {
      pattern: /[a-zA-Z_][a-zA-Z0-9_]*(?=\s*=\s*(?:"[^"]*"|'[^']*'|{[^}]*}))/,
      alias: 'attr-name',
      greedy: true,
    },
  ],
  // Override tag to differentiate lowercase and uppercase tag names
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag-name-lowercase': {
        pattern: /^[a-z][^\s>\/]*/,
        alias: 'tag-internal',
      },
      'tag-name-uppercase': {
        pattern: /^[A-Z][^\s>\/]*/,
        alias: 'tag-custom',
      },
      'punctuation': /<\/?|>/,
      'attr-name': Prism.languages.xjs['attribute-name'],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': /[="']/,
        },
      },
    },
  },
});

// Alias xts to xjs
Prism.languages.xts = Prism.languages.xjs;

export default Prism;
import { sxzz } from '@sxzz/eslint-config'

export default sxzz().removeRules(
  'jsonc/sort-keys',
  'import/no-default-export',
  'no-lonely-if',
  '@typescript-eslint/no-import-type-side-effects',
  'prefer-exponentiation-operator',
  'prettier/prettier',
  'sxzz/prefer-string-function',
  'unicorn/prefer-at',
  'unicorn/consistent-function-scoping',
  'unicorn/filename-case',
  'unicorn/prefer-add-event-listener',
  'unicorn/prefer-date-now',
  'unicorn/prefer-negative-index',
  'unicorn/prefer-math-min-max',
  'unicorn/prefer-number-properties',
  'unicorn/prefer-optional-catch-binding',
  'unicorn/prefer-query-selector',
  'unused-imports/no-unused-vars',
);


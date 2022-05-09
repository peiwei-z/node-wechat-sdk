module.exports = {
  env: {
    browser: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslin:recommended',
    'plugi:@typescript-eslint/recommended',
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    camelcase: ['error'],
    'no-multi-spaces': ['error', {
      ignoreEOLComments: true,
    }],
    'space-before-blocks': ['error'],
    'keyword-spacing': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'comma-spacing': ['error', {
      after: true,
    }],
    'comma-dangle': ['error', {
      imports: 'always-multiline',
      exports: 'always-multiline',
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'always-multiline',
    }],
    eqeqeq: ['error', 'always'],
    complexity: ['error', { ma: 12 }],
  },
};
module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jasmine: true,
  },
  globals: {
    browser: true,
    $$: true,
    $: true,
    expect: true,
  },
  rules: {
    'class-methods-use-this': 0,
    'no-console': 0,
    'no-loop-func': 0,
    'no-useless-escape': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'no-param-reassign': 0,
    'prefer-destructuring': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
};

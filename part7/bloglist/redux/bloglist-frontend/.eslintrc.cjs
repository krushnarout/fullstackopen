module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'vitest-globals/env': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest-globals/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    eqeqeq: 'error',
    'no-console': 0,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'no-unused-vars': 0,
  },
}

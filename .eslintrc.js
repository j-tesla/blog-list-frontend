module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react', 'jest', 'cypress',
  ],
  rules: {
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-alert': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};

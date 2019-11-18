module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/destructuring-assignment': 'off',
    'no-console': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-quotes': 'off'
  },
  globals: {
    fetch: false
  }
};

require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['@rushstack/eslint-config/profile/web-app', '@rushstack/eslint-config/mixins/react'],
  plugins: ['react-hooks'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks deps of Hooks
  },
};

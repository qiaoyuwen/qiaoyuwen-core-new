require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [require.resolve('@qiaoyuwen-core-next/eslint/dist/react')],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};

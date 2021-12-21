require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [require.resolve('@qiaoyuwen-core/eslint/dist/node')],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    'no-bitwise': 0
  }
};

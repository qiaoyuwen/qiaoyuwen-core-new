import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Qiaoyuwen Core',
  mode: 'site',
  history: {
    type: 'hash',
  },
  resolve: {
    includes: ['test-docs'],
    // includes: ['docs', 'src'],
  }
  // more config: https://d.umijs.org/config
});

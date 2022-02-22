import { createLocales } from '@qiaoyuwen-core-next/designer-core'

export const Form = createLocales({
  'zh-CN': {
    title: '表单',
    settings: {
      layout: { title: '布局', dataSource: ['垂直', '水平', '继承'] },
    },
  },
  'en-US': {
    title: 'Form',
    settings: {
      layout: {
        title: 'Layout',
        dataSource: ['Vertical', 'Horizontal', 'Inherit'],
      },
    },
  },
})

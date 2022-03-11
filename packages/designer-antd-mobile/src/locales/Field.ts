export const Field = {
  'zh-CN': {
    settings: {
      name: '字段标识',
      title: '标题',
      required: '必填',
      description: '描述',
      default: '默认值',
      enum: '可选项',
      'x-display': {
        title: '展示状态',
        tooltip: '半隐藏只会隐藏UI，全隐藏会删除数据',
        dataSource: ['显示', '半隐藏', '全隐藏', '继承'],
      },
      'x-pattern': {
        title: 'UI形态',
        dataSource: ['可编辑', '禁用', '只读', '阅读', '继承'],
      },
      'x-validator': '校验规则',
      'x-decorator': '容器组件',
      'x-reactions': '响应器规则',
      'field-group': '字段属性',
      'component-group': '组件属性',
      'decorator-group': '容器属性',
      'component-style-group': '组件样式',
      'decorator-style-group': '容器样式',
      'x-component-props': {
        placeholder: '占位提示',
      },
      'x-decorator-props': {
        layout: { title: '布局', dataSource: ['垂直', '水平', '继承'] },
        help: '提示文本',
        extra: '表单项右侧区域',
        arrow: '是否展示右侧箭头',
      },
    },
  },
  'en-US': {
    settings: {
      name: 'Name',
      title: 'Title',
      required: 'Required',
      description: 'Description',
      default: 'Default',
      enum: 'Options',
      'x-display': {
        title: 'Display State',
        tooltip:
          'When the display value is "None", the data will be "Hidden" and deleted. When the display value is hidden, only the UI will be hidden',
        dataSource: ['Visible', 'Hidden', 'None', 'Inherit'],
      },
      'x-pattern': {
        title: 'UI Pattern',
        dataSource: ['Editable', 'Disabled', 'ReadOnly', 'ReadPretty', 'Inherit'],
      },
      'x-validator': 'Validator',
      'x-decorator': 'Decorator',
      'x-reactions': 'Reactions',
      'field-group': 'Field Properties',
      'component-group': 'Component Properties',
      'decorator-group': 'Decorator Properties',
      'component-style-group': 'Component Style',
      'decorator-style-group': 'Decorator Style',
      'x-component-props': {
        placeholder: 'Placeholder',
      },
      'x-decorator-props': {
        layout: {
          title: 'Layout',
          dataSource: ['Vertical', 'Horizontal', 'Inherit'],
        },
        help: 'Help',
        extra: 'Extra',
        arrow: 'Arrow',
      },
    },
  },
};

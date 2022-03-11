import { ISchema } from '@formily/react'

export const FormItem: ISchema = {
  type: 'object',
  properties: {
    layout: {
      type: 'string',
      enum: ['vertical', 'horizontal', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'vertical',
      },
    },
    help: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    extra: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    arrow: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

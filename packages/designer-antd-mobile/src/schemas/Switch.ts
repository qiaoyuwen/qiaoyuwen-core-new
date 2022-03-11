import { ISchema } from '@formily/react';

export const Switch: ISchema = {
  type: 'object',
  properties: {
    checkedText: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    uncheckedText: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
};

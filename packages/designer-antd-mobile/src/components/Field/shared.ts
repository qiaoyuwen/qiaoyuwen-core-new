import { ISchema } from '@formily/json-schema';
import { ReactionsSetter, DataSourceSetter, ValidatorSetter } from '@qiaoyuwen-core-next/designer-setters';
import { ReactNode } from 'react';
import { AllSchemas } from '../../schemas';

export const createComponentSchema = (component: ISchema, decorator: ISchema) => {
  return {
    'component-group': component && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        'x-component-props': component,
      },
    },
    'decorator-group': decorator && {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      properties: {
        'x-decorator-props': decorator,
      },
    },
  };
};

type IValueInputType = 'TEXT' | 'EXPRESSION' | 'BOOLEAN' | 'NUMBER' | 'DATE' | 'DATETIME';

export const createFieldSchema = (options: {
  component?: ISchema;
  decorator?: ISchema;
  dataSourceSetter?: false | ReactNode;
  defaultValueInputType?: IValueInputType | IValueInputType[];
}): ISchema => {
  const { component, decorator = AllSchemas.FormItem, defaultValueInputType } = options;

  let dataSourceSetter = options.dataSourceSetter;
  if (dataSourceSetter !== false && !dataSourceSetter) {
    dataSourceSetter = DataSourceSetter;
  }

  return {
    type: 'object',
    properties: {
      'field-group': {
        type: 'void',
        'x-component': 'CollapseItem',
        properties: {
          name: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          title: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          description: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
          },
          'x-display': {
            type: 'string',
            enum: ['visible', 'hidden', 'none', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'visible',
            },
          },
          'x-pattern': {
            type: 'string',
            enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              defaultValue: 'editable',
            },
          },
          default: {
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
            'x-component-props': defaultValueInputType
              ? {
                  include: Array.isArray(defaultValueInputType) ? defaultValueInputType : [defaultValueInputType],
                }
              : undefined,
          },
          enum: dataSourceSetter
            ? {
                'x-decorator': 'FormItem',
                'x-component': DataSourceSetter,
              }
            : undefined,
          'x-reactions': {
            'x-decorator': 'FormItem',
            'x-component': ReactionsSetter,
          },
          'x-validator': {
            type: 'array',
            'x-component': ValidatorSetter,
          },
          required: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
      ...createComponentSchema(component, decorator),
    },
  };
};

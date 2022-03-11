import { Input as FormilyInput } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createBehavior, createResource } from '@qiaoyuwen-core-next/designer-core';
import { DnFC } from '@qiaoyuwen-core-next/designer-react';
import { createFieldSchema } from '@qiaoyuwen-core-next/designer-antd';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>> = FormilyInput;

Input.Behavior = createBehavior({
  name: 'Input',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Input',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Input),
  },
  designerLocales: AllLocales.Input,
});

Input.Resource = createResource({
  icon: 'InputSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Input',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  ],
});

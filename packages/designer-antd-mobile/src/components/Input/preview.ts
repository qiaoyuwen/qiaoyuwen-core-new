import React from 'react';
import { Input as FormilyInput } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createBehavior, createResource } from '@qiaoyuwen-core-next/designer-core';
import { DnFC } from '@qiaoyuwen-core-next/designer-react';
import { createFieldSchema, AllLocales } from '@qiaoyuwen-core-next/designer-antd';
import { AllSchemas } from '../../schemas';

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>> = FormilyInput;

Input.Behavior = createBehavior({
  name: 'MobileInput',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'MobileInput',
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
        title: 'MobileInput',
        'x-decorator': 'FormItem',
        'x-component': 'MobileInput',
      },
    },
  ],
});

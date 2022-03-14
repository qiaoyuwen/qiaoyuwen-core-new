import { Rate as FormilyRate } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createBehavior, createResource } from '@qiaoyuwen-core-next/designer-core';
import { DnFC } from '@qiaoyuwen-core-next/designer-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const Rate: DnFC<React.ComponentProps<typeof FormilyRate>> = FormilyRate;

Rate.Behavior = createBehavior({
  name: 'Rate',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Rate',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Rate),
  },
  designerLocales: AllLocales.Rate,
});

Rate.Resource = createResource({
  icon: 'RateSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Rate',
        'x-decorator': 'FormItem',
        'x-component': 'Rate',
      },
    },
  ],
});

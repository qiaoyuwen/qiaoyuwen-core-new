import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Selector, Slider, Stepper, Switch } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { TreeNode } from '@qiaoyuwen-core-next/designer-core';
import { transformToSchema } from '@qiaoyuwen-core-next/designer-transformer';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Selector,
    Slider,
    Stepper,
    Switch,
  },
});

export interface IMobilePreviewWidgetProps {
  tree: TreeNode;
}

export const MobilePreviewWidget: React.FC<IMobilePreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree);
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};

import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { TreeNode } from '@qiaoyuwen-core-next/designer-core';
import { transformToSchema } from '@qiaoyuwen-core-next/designer-transformer';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
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

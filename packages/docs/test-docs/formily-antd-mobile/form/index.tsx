/* eslint-disable @rushstack/typedef-var */
import { FunctionComponent } from 'react';
import { Form, FormItem, Input, Field } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createForm } from '@formily/core';
import { Button } from 'antd-mobile';

const form = createForm<{}>();

const Component: FunctionComponent = () => {
  if (!FormItem.BaseItem) {
    return null;
  }

  return (
    <Form form={form}>
      <Form.Header>标题1</Form.Header>
      <Field name="username" title="用户名" required decorator={[FormItem]} component={[Input, {
        placeholder: '请输入用户名'
      }]} />
      <Button
        onClick={async () => {
          const data = await form.submit();
          console.log('data', data);
        }}
      >
        提交
      </Button>
    </Form>
  );
};

export default Component;

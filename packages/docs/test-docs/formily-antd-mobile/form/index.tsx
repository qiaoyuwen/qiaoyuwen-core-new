/* eslint-disable @rushstack/typedef-var */
import { FunctionComponent } from 'react';
import { Form, FormItem, Input } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createForm } from '@formily/core';

const form = createForm<{}>();

const Component: FunctionComponent = () => {
  if (!FormItem.BaseItem) {
    return null;
  }
  return (
    <Form form={form}>
      <Form.Header>标题1</Form.Header>
      <FormItem.BaseItem label="姓名" required>
        <Input placeholder="请输入姓名" />
      </FormItem.BaseItem>
      <FormItem.BaseItem label="地址" help="详情地址">
        <Input placeholder="请输入地址" />
      </FormItem.BaseItem>
    </Form>
  );
};

export default Component;

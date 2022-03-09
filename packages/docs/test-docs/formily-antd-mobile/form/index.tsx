/* eslint-disable @rushstack/typedef-var */
import { FunctionComponent } from 'react';
import { Form } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createForm } from '@formily/core';

const form = createForm<{}>();

const Component: FunctionComponent = () => {
  return (
    <Form form={form}>
      <Form.Header>标题1</Form.Header>
      <div>item1.1</div>
      <div>item1.2</div>
      <div>item1.3</div>
    </Form>
  );
};

export default Component;

/**
 * title: 将 state 持久化在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import React, { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { Space, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useLocalStorage } from '@qiaoyuwen-core/react-hooks';

const Component: FunctionComponent = () => {
  const [value, setValue] = useLocalStorage('localStorageDemo', '');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const reset = useCallback(() => {
    setValue('');
  }, [setValue]);

  return (
    <>
      <Space direction="vertical">
        <Space>
          <Input value={value} onChange={onChange} />
        </Space>
        <Space>
          <Button type="primary" onClick={reset}>
            重置
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;

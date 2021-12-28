import { FunctionComponent } from 'react';
import { Space, Button, List } from 'antd';
import 'antd/dist/antd.css';
import { useArray } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const [data, { push, remove, reverse }] = useArray<string>([]);

  return (
    <>
      <Space direction="vertical">
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <span style={{ width: 250 }}>{item}</span>
              <Button type="primary" danger onClick={() => remove(item)}>
                删除
              </Button>
            </List.Item>
          )}
        />
        <Space>
          <Button type="primary" onClick={() => push(`${Math.random()}`)}>
            添加
          </Button>
          <Button type="primary" onClick={() => reverse()}>
            反转
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;

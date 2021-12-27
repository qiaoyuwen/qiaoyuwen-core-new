import React, { FunctionComponent } from 'react';
import { Space, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { useSelection } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const data = [1, 2, 3, 4];
  const defaltSelections = [1, 2];
  const [, { isSelected, toggle }, { allSelected, partiallySelected, toggleAll }] = useSelection(
    data,
    defaltSelections,
  );

  return (
    <>
      <Space direction="vertical">
        {data.map((item) => (
          <Checkbox key={item} checked={isSelected(item)} onChange={() => toggle(item)}>
            {item}
          </Checkbox>
        ))}
        <Space>
          <Checkbox indeterminate={partiallySelected} onChange={toggleAll} checked={allSelected}>
            全选
          </Checkbox>
        </Space>
      </Space>
    </>
  );
};

export default Component;

import type { FunctionComponent } from 'react';
import React from 'react';
import 'antd/dist/antd.css';
import { useInfinitePagination } from '@qiaoyuwen-core/react-hooks';
import { Button, List, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

const fetcher = (current: number, pageSize: number): Promise<string[]> => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      const data: string[] = [];
      for (let i = 0; i < pageSize; i += 1) {
        data.push(`${Math.random()}`);
      }
      if (current > 5) {
        resolve(data.slice(0, 4));
      } else {
        resolve(data);
      }
    }, 500);
  });
};

const Component: FunctionComponent = () => {
  const [data, { loadMore, refresh, reset, isReachingEnd, isLoading, isRefreshing }] = useInfinitePagination(
    'key',
    fetcher,
    10,
  );

  return (
    <>
      <Space>
        <Button style={{ marginBottom: 12 }} type="primary" onClick={() => loadMore()}>
          加载更多
        </Button>
        <Button style={{ marginBottom: 12 }} type="primary" onClick={() => refresh()}>
          刷新
        </Button>
        <Button style={{ marginBottom: 12 }} type="primary" onClick={() => reset()}>
          重置
        </Button>
      </Space>

      <div
        style={{
          height: '400px',
          padding: '8px 24px',
          overflow: 'auto',
          border: '1px solid #e8e8e8',
          borderRadius: '4px',
        }}
      >
        <InfiniteScroll initialLoad={false} loadMore={loadMore} hasMore={!isReachingEnd} useWindow={false}>
          <List
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={item}>
                <div>
                  {index + 1}、 {item}
                </div>
              </List.Item>
            )}
            loading={isLoading || isRefreshing}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Component;

---
title: useInfinitePagination
---

# useInfinitePagination

无限加载分页的 hook

<code src="./index.tsx">

# API

```typescript
const [
  data,
  methods,
] = useInfinitePagination(
  key: string,
  fetcher: (current: number, pageSize: number, params?: Record<string, any>) => Promise<T[], P = Record<string, any>>,
  pageSize: number,
  params?: P,
);
```

# 参数

| 参数名   | 说明            | 类型                                                            |
| -------- | --------------- | --------------------------------------------------------------- |
| key      | swr 唯一 key 值 | string                                                          |
| fetcher  | 获取数据的方法  | (current: number, pageSize: number, params?: P) => Promise<T[]> |
| pageSize | 每页大小        | number                                                          |
| params   | 其它参数        | P                                                               |

# 返回值

| 参数名  | 说明     | 类型   |
| ------- | -------- | ------ |
| data    | 分页数据 | T[]    |
| methods | 方法集   | object |

# methods

| 属性          | 说明         | 类型       |
| ------------- | ------------ | ---------- |
| refresh       | 刷新         | () => void |
| loadMore      | 加载下一页   | () => void |
| reset         | 重置到第一页 | () => void |
| isLoading     | 是否加载中   | boolean    |
| isEmpty       | 是否为空     | boolean    |
| isReachingEnd | 是否加载完毕 | boolean    |
| isRefreshing  | 是否刷新中   | boolean    |

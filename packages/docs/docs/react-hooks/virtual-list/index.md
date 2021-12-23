---
title: useVirtualList
---

# useVirtualList

虚拟化列表的 hook

<code src="./useVirtualList.tsx">

<code src="./useVirtualListDrag.tsx">

# API

```typescript
const result: Result = useVirtualList(list: T[], options: Options);
```

# Params

| 参数       | 说明                       | 类型                                  |
| ---------- | -------------------------- | ------------------------------------- |
| itemHeight | 每行的高度                 | number \| ((index: number) => number) |
| overscan   | 视区上下额外显示的元素数量 | number = 5                            |

# Result

| 参数           | 说明                      | 类型                       |
| -------------- | ------------------------- | -------------------------- |
| list           | 当前展示的数据列表        | {data: T, index: number}[] |
| containerProps | 滚动容器的 props          | object                     |
| wrapperProps   | children 外层包裹器 props | object                     |
| scrollTo       | 滚动到指定位置处          | (index: number) => void    |

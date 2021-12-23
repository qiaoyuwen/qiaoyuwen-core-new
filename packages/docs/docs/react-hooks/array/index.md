---
title: useArray
---

# useArray

管理数组的 hook

<code src="./index.tsx">

# API

```typescript
const [
  state,
  methods,
] = useArray(
  initialValue?: T[],
);
```

# 返回值

| 参数    | 说明   | 类型    |
| ------- | ------ | ------- |
| state   | 状态值 | boolean |
| methods | 方法集 | object  |

# methods

| 属性       | 说明 | 类型                                                             |
| ---------- | ---- | ---------------------------------------------------------------- |
| push       | -    | (item: T) => void                                                |
| unshift    | -    | (item: T) => void                                                |
| pop        | -    | (item: T) => void                                                |
| shift      | -    | (item: T) => void                                                |
| slice      | -    | (start?: number, end?: number) => void                           |
| splice     | -    | (index: number, deleteCount: number, ...insertions: T[]) => void |
| remove     | -    | (item: T) => void                                                |
| removeAt   | -    | (index: number) => void                                          |
| insertAt   | -    | (index: number, item: T) => void                                 |
| concat     | -    | (item: T \| T[]) => void                                         |
| replace    | -    | (from: T, to: T) => void                                         |
| replaceAll | -    | (from: T, to: T) => void                                         |
| replaceAt  | -    | (index: number, item: T) => void                                 |
| filter     | -    | (predicate: (item: T, index: number) => boolean) => void         |
| union      | -    | (array: T[]) => void                                             |
| intersect  | -    | (array: T[]) => void                                             |
| difference | -    | (array: T[]) => void                                             |
| reverse    | -    | () => void                                                       |
| sort       | -    | (compare?: (x: T, y: T) => number) => void                       |
| clear      | -    | () => void                                                       |

---
title: useSet
---

# useSet

管理 Set 的 hook

<code src="./index.tsx">

# API

```typescript
const [
  state,
  methods,
] = useSet(
  initialValue?: T[],
);
```

# 返回值

| 参数    | 说明   | 类型    |
| ------- | ------ | ------- |
| state   | 状态值 | boolean |
| methods | 方法集 | object  |

# methods

| 属性      | 说明 | 类型                        |
| --------- | ---- | --------------------------- |
| add       | -    | (item: T) => void           |
| addAll    | -    | (item: Iterable<T>) => void |
| remove    | -    | (item: T) => void           |
| removeAll | -    | (item: Iterable<T>) => void |
| clear     | -    | () => void                  |

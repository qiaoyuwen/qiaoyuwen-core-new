---
title: useBoolean
---

# useBoolean

管理布尔值的 hook

<code src="./index.tsx">

# API

```typescript
const [
  state,
  methods,
] = useBoolean(
  initialValue?: boolean,
);
```

# 返回值

| 参数    | 说明   | 类型    |
| ------- | ------ | ------- |
| state   | 状态值 | boolean |
| methods | 方法集 | object  |

# methods

| 属性     | 说明         | 类型       |
| -------- | ------------ | ---------- |
| setTrue  | 设置为 true  | () => void |
| setFalse | 设置为 false | () => void |
| toggle   | 切换状态值   | () => void |

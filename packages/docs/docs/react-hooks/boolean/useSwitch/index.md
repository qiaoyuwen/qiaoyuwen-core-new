---
title: useSwitch
---

# useSwitch

管理布尔值的 hook

<code src="./index.tsx">

# API

```typescript
const [
  state,
  methods,
] = useSwitch(
  initialValue?: boolean,
);
```

# 返回值

| 参数    | 说明   | 类型    |
| ------- | ------ | ------- |
| state   | 状态值 | boolean |
| methods | 方法集 | object  |

# methods

| 属性   | 说明         | 类型       |
| ------ | ------------ | ---------- |
| on     | 设置为 true  | () => void |
| off    | 设置为 false | () => void |
| toggle | 切换状态值   | () => void |

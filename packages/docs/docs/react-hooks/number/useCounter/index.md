---
title: useCounter
---

# useCounter

管理计数的 hook

<code src="./index.tsx">

# API

```typescript
interface CounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

const [
  state,
  methods,
] = useCounter(
  initialValue: number = 0,
  options: CounterOptions = {}
);
```

# CounterOptions

| 参数 | 说明   | 类型   |
| ---- | ------ | ------ |
| min  | 最小值 | number |
| max  | 最大值 | number |
| step | 间距   | number |

# 返回值

| 参数    | 说明   | 类型    |
| ------- | ------ | ------- |
| state   | 状态值 | boolean |
| methods | 方法集 | object  |

# methods

| 属性  | 说明             | 类型                    |
| ----- | ---------------- | ----------------------- |
| inc   | 按设置的间距增加 | () => void              |
| dec   | 按设置的间距减少 | () => void              |
| reset | 重置             | (value: number) => void |

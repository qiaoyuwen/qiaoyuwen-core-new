---
title: useCountdown
---

# useCountdown

管理倒计时的 hook

<code src="./index.tsx">

# API

```typescript
const [countdown, start, pause, reset] = useCountdown(
  initialCountdownMs: number,
  stepMs: number,
  callback?: () => void,
);
```

# 返回值

| 参数      | 说明   | 类型       |
| --------- | ------ | ---------- |
| countdown | 倒计时 | number     |
| start     | 启动   | () => void |
| pause     | 暂停   | () => void |
| reset     | 重置   | () => void |

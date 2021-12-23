---
title: useSelection
---

# useSelection

管理选择项的 hook

<code src="./index.tsx">

# API

```typescript
const [
  state,
  singleActions,
  allActions,
] = useSelection(
  items: T[],
  defaultSelected: T[] = []
);
```

# 返回值

| 参数          | 说明       | 类型    |
| ------------- | ---------- | ------- |
| state         | 状态值     | boolean |
| singleActions | 单选操作集 | object  |
| allActions    | 全选操作集 | object  |

# singleActions

| 属性       | 说明     | 类型                 |
| ---------- | -------- | -------------------- |
| isSelected | 是否选中 | (item: T) => boolean |
| select     | 勾选     | (item: T) => void    |
| unSelect   | 去掉勾选 | (item: T) => void    |
| toggle     | 切换勾选 | (item: T) => void    |

# allActions

| 属性              | 说明           | 类型       |
| ----------------- | -------------- | ---------- |
| noneSelected      | 是否为全未选中 | boolean    |
| allSelected       | 是否为全选中   | boolean    |
| partiallySelected | 是否为部分选中 | boolean    |
| selectAll         | 全选           | () => void |
| unSelectAll       | 全未选         | () => void |
| toggleAll         | 切换全选       | () => void |

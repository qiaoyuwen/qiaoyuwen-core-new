import { useSet } from '../set';
import { useMemo } from 'react';

export function useSelection<T>(items: T[], defaultSelected: T[] = []) {
  const [selections, operator] = useSet(defaultSelected);

  const singleActions = useMemo(() => {
    const isSelected = (item: T) => {
      return selections.has(item);
    };

    const select = (item: T) => {
      operator.add(item);
    };

    const unSelect = (item: T) => {
      operator.remove(item);
    };

    const toggle = (item: T) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };

    return {
      isSelected,
      select,
      unSelect,
      toggle,
    };
  }, [selections, operator]);

  const allActions = useMemo(() => {
    const selectAll = () => {
      operator.addAll(items);
    };

    const unSelectAll = () => {
      operator.removeAll(items);
    };

    const noneSelected = items.every((item) => !selections.has(item));

    const allSelected = items.every((item) => selections.has(item)) && !noneSelected;

    const partiallySelected = !noneSelected && !allSelected;

    const toggleAll = () => {
      if (allSelected) {
        unSelectAll();
      } else {
        selectAll();
      }
    };

    return {
      selectAll,
      unSelectAll,
      noneSelected,
      allSelected,
      partiallySelected,
      toggleAll,
    };
  }, [selections, operator, items]);

  return [
    selections,
    {
      ...singleActions,
    },
    {
      ...allActions,
    },
  ] as const;
}

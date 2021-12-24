/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSize } from '../size';

interface IRange {
  start: number;
  end: number;
}

export interface IOption {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
}

export function useVirtualList<T>(list: T[], options: IOption) {
  const containerRef = useRef<HTMLElement | null>();
  const size = useSize(containerRef);
  const [range, setRange] = useState<IRange>({
    start: 0,
    end: 10,
  });
  const { itemHeight, overscan = 5 } = options;

  const getViewCapacity = useCallback(
    (containerHeight: number) => {
      if (typeof itemHeight === 'number') {
        return Math.ceil(containerHeight / itemHeight);
      }
      const { start = 0 } = range;
      let sum = 0;
      let capacity = 0;
      for (let i = start; i < list.length; i += 1) {
        const height = (itemHeight as (index: number) => number)(i);
        sum += height;
        if (sum >= containerHeight) {
          capacity = i;
          break;
        }
      }
      return capacity - start;
    },
    [itemHeight, list.length, range],
  );

  const getOffset = useCallback(
    (scrollTop: number) => {
      if (typeof itemHeight === 'number') {
        return Math.floor(scrollTop / itemHeight) + 1;
      }
      let sum = 0;
      let offset = 0;
      for (let i = 0; i < list.length; i += 1) {
        const height = (itemHeight as (index: number) => number)(i);
        sum += height;
        if (sum >= scrollTop) {
          offset = i;
          break;
        }
      }
      return offset + 1;
    },
    [itemHeight, list.length],
  );

  const calculateRange = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      const offset = getOffset(el.scrollTop);
      const viewCapacity = getViewCapacity(el.clientHeight);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      const start = from < 0 ? 0 : from;
      const end = to > list.length ? list.length : to;
      if (range.start !== start || range.end !== end) {
        setRange({
          start,
          end,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height, getOffset, getViewCapacity, list.length, overscan]);

  useEffect(() => {
    calculateRange();
  }, [calculateRange]);

  const totalHeight = useMemo(() => {
    if (typeof itemHeight === 'number') {
      return list.length * itemHeight;
    }
    return list.reduce((sum, _, index) => sum + itemHeight(index), 0);
  }, [itemHeight, list]);

  const getDistanceTop = useCallback(
    (index: number) => {
      if (typeof itemHeight === 'number') {
        const height = index * itemHeight;
        return height;
      }
      const height = list.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);

      return height;
    },
    [itemHeight, list],
  );

  const scrollTo = useCallback(
    (index: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTop = getDistanceTop(index);
        calculateRange();
      }
    },
    [calculateRange, getDistanceTop],
  );

  const offsetTop = useMemo(() => getDistanceTop(range.start), [getDistanceTop, range.start]);

  return {
    list: list.slice(range.start, range.end).map((ele, index) => ({
      data: ele,
      index: index + range.start,
    })),
    scrollTo,
    containerProps: {
      ref: (ele: any) => {
        containerRef.current = ele;
      },
      onScroll: (e: any) => {
        e.preventDefault();
        calculateRange();
      },
      style: { overflowY: 'auto' as const },
    },
    wrapperProps: {
      style: {
        width: '100%',
        height: totalHeight - offsetTop,
        marginTop: offsetTop,
      },
    },
  };
}

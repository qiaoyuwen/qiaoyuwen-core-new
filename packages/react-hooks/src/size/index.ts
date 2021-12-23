import { useLayoutEffect, useState } from 'react';
import { BasicTarget, getTargetElement } from '../utils/dom';

interface ISize {
  width?: number;
  height?: number;
}

export function useSize(target: BasicTarget) {
  const [size, setSize] = useState<ISize>(() => {
    const el = (getTargetElement(target) || {}) as HTMLElement;
    return {
      width: el.clientWidth,
      height: el.clientHeight,
    };
  });

  useLayoutEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [target]);

  return size;
}

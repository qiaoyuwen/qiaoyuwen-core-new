import type { MutableRefObject } from 'react';

type Target<T> = T | undefined | null;

export type BasicTarget<T = Element> = (() => Target<T>) | Target<T> | MutableRefObject<Target<T>>;

export function getTargetElement<T>(target?: BasicTarget<T>, defaultTarget?: T) {
  if (!target) {
    return defaultTarget;
  }

  let targetElement: Target<T>;
  if (typeof target === 'function') {
    // @ts-ignore
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

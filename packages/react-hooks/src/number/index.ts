import { useMethodsNative } from '../methods';

export interface ICounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

export function useCounter(initialValue: number = 0, options: ICounterOptions = {}) {
  const { min = -Infinity, max = Infinity, step = 1 } = options;
  return useMethodsNative(
    {
      inc(state: number) {
        return Math.min(max, state + step);
      },
      dec(state: number) {
        return Math.max(min, state - step);
      },
      reset(state: number, value: number) {
        return value;
      },
    },
    initialValue,
  );
}

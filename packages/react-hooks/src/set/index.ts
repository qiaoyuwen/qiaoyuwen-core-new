import { useMethodsNative } from '../methods';

const clone = <T>(set: Set<T>) => new Set(set.values());

function createReducers<T>() {
  return {
    add(state: Set<T>, item: T) {
      if (state.has(item)) {
        return state;
      }

      return clone(state).add(item);
    },
    addAll(state: Set<T>, items: Iterable<T>) {
      const output = clone(state);
      for (const item of items) {
        output.add(item);
      }
      return output;
    },
    remove(state: Set<T>, item: T) {
      if (state.has(item)) {
        const output = clone(state);
        output.delete(item);
        return output;
      }

      return state;
    },
    removeAll(state: Set<T>, items: Iterable<T>) {
      const output = clone(state);
      for (const item of items) {
        output.delete(item);
      }
      return output;
    },
    clear() {
      return new Set<T>();
    },
  };
}

export function useSet<T>(initialValue: Iterable<T> = []) {
  return useMethodsNative(createReducers<T>(), () => new Set(initialValue));
}

import { useMethodsNative, NativeReducers } from '..';

const reducers: NativeReducers<boolean> = {
  setTrue() {
    return true;
  },
  setFalse() {
    return false;
  },
  toggle(value: boolean) {
    return !value;
  },
};

export function useBoolean(initialValue: boolean = false) {
  return useMethodsNative(reducers, initialValue);
}

export function useSwitch(initialValue: boolean = false) {
  const [state, { setTrue: on, setFalse: off, toggle }] = useBoolean(initialValue);
  return [state, { on, off, toggle }] as const;
}

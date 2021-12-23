import { useCallback, useEffect, useState } from 'react';

function getLocalStorageValue<T>(key: string, initialValue: T): T {
  try {
    const valueString = window.localStorage.getItem(key);
    return valueString ? JSON.parse(valueString) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => getLocalStorageValue(key, initialValue));

  const setLocalStorageValue = useCallback(
    (newValue: T) => {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key],
  );

  useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.storageArea === window.localStorage && key === e.key) {
        try {
          setValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch {
          setValue(initialValue);
        }
      }
    };
    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, [initialValue, key]);

  return [value, setLocalStorageValue] as const;
}

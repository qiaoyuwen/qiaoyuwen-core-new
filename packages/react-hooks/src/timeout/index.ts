import { useCallback, useEffect, useRef, useState } from 'react';

export function useTimeout(callback: () => void, ms: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (ms < 0) {
      return;
    }
    const timeoutId = setTimeout(callbackRef.current, ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms]);
}

export function useInterval(callback: () => void, ms: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (ms < 0) {
      return;
    }
    const timeoutId = setInterval(callbackRef.current, ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms]);
}

export function useCountdown(initialCountdownMs: number = 60 * 1000, stepMs: number = 1 * 1000, callback?: () => void) {
  const [countdown, setCountdown] = useState(initialCountdownMs);
  const countdownRef = useRef(initialCountdownMs);
  const timeoutIdRef = useRef<number>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const removeTimeout = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  }, []);

  const start = useCallback(() => {
    removeTimeout();
    if (stepMs < 0) {
      return Promise.resolve();
    }
    timeoutIdRef.current = setInterval(() => {
      countdownRef.current -= stepMs;
      setCountdown(countdownRef.current);

      if (countdownRef.current <= 0) {
        removeTimeout();
        callbackRef.current?.();
      }
    }, stepMs);
  }, [removeTimeout, stepMs]);

  const reset = useCallback(() => {
    removeTimeout();
    countdownRef.current = initialCountdownMs;
    setCountdown(countdownRef.current);
  }, [initialCountdownMs, removeTimeout]);

  useEffect(() => {
    return () => {
      removeTimeout();
    };
  }, [removeTimeout]);

  return [countdown, start, removeTimeout, reset] as const;
}

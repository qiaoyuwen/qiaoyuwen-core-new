import { renderHook, act } from '@testing-library/react-hooks';
import { useSet } from '../src/set/index';

describe('useSet', () => {
  test('valid return type', () => {
    const { result } = renderHook(() => useSet());
    const [value, methods] = result.current;
    expect(value).toStrictEqual(new Set());
    Object.keys(methods).forEach((key) => {
      expect(typeof methods[key]).toBe('function');
    });
  });

  test('initial value true', () => {
    const { result } = renderHook(() => useSet([1]));
    const [value] = result.current;
    expect(value).toStrictEqual(new Set([1]));
  });

  test('add', () => {
    const { result } = renderHook(() => useSet([1]));
    act(() => result.current[1].add(2));
    expect(result.current[0]).toStrictEqual(new Set([1, 2]));

    act(() => result.current[1].add(2));
    expect(result.current[0]).toStrictEqual(new Set([1, 2]));
  });

  test('addAll', () => {
    const { result } = renderHook(() => useSet([1]));
    act(() => result.current[1].addAll([2, 3]));
    expect(result.current[0]).toStrictEqual(new Set([1, 2, 3]));
  });

  test('remove', () => {
    const { result } = renderHook(() => useSet([1, 2]));
    act(() => result.current[1].remove(2));
    expect(result.current[0]).toStrictEqual(new Set([1]));

    act(() => result.current[1].remove(2));
    expect(result.current[0]).toStrictEqual(new Set([1]));
  });

  test('removeAll', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));
    act(() => result.current[1].removeAll([2, 3]));
    expect(result.current[0]).toStrictEqual(new Set([1]));
  });

  test('clear', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));
    act(() => result.current[1].clear());
    expect(result.current[0]).toStrictEqual(new Set());
  });
});

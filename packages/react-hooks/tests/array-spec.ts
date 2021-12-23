import { renderHook, act } from '@testing-library/react-hooks';
import { useArray } from '../src';

describe('useArray', () => {
  test('valid return type', () => {
    const { result } = renderHook(() => useArray());
    const [value, methods] = result.current;
    expect(value).toStrictEqual([]);
    Object.keys(methods).forEach((key) => {
      expect(typeof methods[key]).toBe('function');
    });
  });

  test('initial value true', () => {
    const { result } = renderHook(() => useArray([1]));
    const [value] = result.current;
    expect(value).toStrictEqual([1]);
  });

  test('push', () => {
    const { result } = renderHook(() => useArray([1]));
    act(() => result.current[1].push(2));
    const [value] = result.current;
    expect(value).toStrictEqual([1, 2]);
  });

  test('unshift', () => {
    const { result } = renderHook(() => useArray([1]));
    act(() => result.current[1].unshift(2));
    const [value] = result.current;
    expect(value).toStrictEqual([2, 1]);
  });

  test('pop', () => {
    const { result } = renderHook(() => useArray([1]));
    act(() => result.current[1].pop());
    expect(result.current[0]).toStrictEqual([]);

    act(() => result.current[1].pop());
    expect(result.current[0]).toStrictEqual([]);
  });

  test('shift', () => {
    const { result } = renderHook(() => useArray([1]));
    act(() => result.current[1].shift());
    expect(result.current[0]).toStrictEqual([]);

    act(() => result.current[1].shift());
    expect(result.current[0]).toStrictEqual([]);
  });

  test('slice', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].slice(0, 1));
    const [value] = result.current;
    expect(value).toStrictEqual([1]);
  });

  test('splice', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].splice(0, 1, 4));
    const [value] = result.current;
    expect(value).toStrictEqual([4, 2, 3]);
  });

  test('remove', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].remove(2));
    expect(result.current[0]).toStrictEqual([1, 3]);

    act(() => result.current[1].remove(2));
    expect(result.current[0]).toStrictEqual([1, 3]);
  });

  test('removeAt', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].removeAt(1));
    const [value] = result.current;
    expect(value).toStrictEqual([1, 3]);
  });

  test('insertAt', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].insertAt(1, 4));
    const [value] = result.current;
    expect(value).toStrictEqual([1, 4, 2, 3]);
  });

  test('concat', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].concat(4));
    const [value] = result.current;
    expect(value).toStrictEqual([1, 2, 3, 4]);
  });

  test('replace', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].replace(2, 4));
    expect(result.current[0]).toStrictEqual([1, 4, 3]);

    act(() => result.current[1].replace(2, 1));
    expect(result.current[0]).toStrictEqual([1, 4, 3]);
  });

  test('replaceAll', () => {
    const { result } = renderHook(() => useArray([1, 2, 2, 3, 2]));
    act(() => result.current[1].replaceAll(2, 4));
    expect(result.current[0]).toStrictEqual([1, 4, 4, 3, 4]);

    act(() => result.current[1].replaceAll(5, 0));
    expect(result.current[0]).toStrictEqual([1, 4, 4, 3, 4]);
  });

  test('replaceAt', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].replaceAt(1, 4));
    const [value] = result.current;
    expect(value).toStrictEqual([1, 4, 3]);
  });

  test('filter', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].filter((item) => item === 1));
    const [value] = result.current;
    expect(value).toStrictEqual([1]);
  });

  test('union', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].union([4, 5]));
    const [value] = result.current;
    expect(value).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test('intersect', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].intersect([2, 3, 4]));
    const [value] = result.current;
    expect(value).toStrictEqual([2, 3]);
  });

  test('difference', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].difference([2, 3, 4]));
    const [value] = result.current;
    expect(value).toStrictEqual([1]);
  });

  test('reverse', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].reverse());
    const [value] = result.current;
    expect(value).toStrictEqual([3, 2, 1]);
  });

  test('sort', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].sort((item1, item2) => item2 - item1));
    const [value] = result.current;
    expect(value).toStrictEqual([3, 2, 1]);
  });

  test('clear', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => result.current[1].clear());
    const [value] = result.current;
    expect(value).toStrictEqual([]);
  });
});

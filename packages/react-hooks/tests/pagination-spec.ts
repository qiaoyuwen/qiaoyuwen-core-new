import { act, renderHook } from '@testing-library/react-hooks';
import { useInfinitePagination } from '../src/pagination';

const timeout = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

const fetcher = (current: number, pageSize: number) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      const data: string[] = [];
      for (let i = 0; i < pageSize; i += 1) {
        data.push(`${current + (current - 1) * pageSize}`);
      }
      if (current > 1) {
        resolve(data.slice(0, 5));
      } else {
        resolve(data);
      }
    }, 100);
  });
};

const emptyFetcher = () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 100);
  });
};

const errorFetcher = (current: number, pageSize: number) => {
  return new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      const data: string[] = [];
      for (let i = 0; i < pageSize; i += 1) {
        data.push(`${current + (current - 1) * pageSize}`);
      }
      if (current > 1) {
        reject();
      } else {
        resolve(data);
      }
    }, 100);
  });
};

describe('useInfinitePagination', () => {
  test('init', async () => {
    const { result } = renderHook(() => useInfinitePagination('init test', fetcher, 10));
    expect(result.current[0]).toStrictEqual([]);
    expect(result.current[1].isLoading).toEqual(true);
    expect(result.current[1].isEmpty).toEqual(false);
    expect(result.current[1].isReachingEnd).toEqual(false);
    expect(result.current[1].isRefreshing).toEqual(false);
    await act(async () => {
      await timeout(150);
      expect(result.current[0].length).toStrictEqual(10);
      expect(result.current[1].isLoading).toEqual(false);
      expect(result.current[1].isEmpty).toEqual(false);
      expect(result.current[1].isReachingEnd).toEqual(false);
      expect(result.current[1].isRefreshing).toEqual(false);
    });
  });

  test('empty', async () => {
    const { result } = renderHook(() => useInfinitePagination('empty test', emptyFetcher, 10));
    expect(result.current[1].isReachingEnd).toEqual(false);
    await act(async () => {
      await timeout(150);
      expect(result.current[0].length).toStrictEqual(0);
      expect(result.current[1].isLoading).toEqual(false);
      expect(result.current[1].isReachingEnd).toEqual(true);
    });
  });

  test('loadMore', async () => {
    const { result } = renderHook(() => useInfinitePagination('loadMore test', fetcher, 10));
    await act(async () => {
      await timeout(150);
      await result.current[1].loadMore();
      await result.current[1].loadMore();
      await timeout(150);
      expect(result.current[0].length).toStrictEqual(15);
      expect(result.current[1].isLoading).toEqual(false);
      expect(result.current[1].isReachingEnd).toEqual(true);
      await result.current[1].reset();
      await timeout(150);
      expect(result.current[0].length).toStrictEqual(10);
      expect(result.current[1].isLoading).toEqual(false);
      expect(result.current[1].isReachingEnd).toEqual(false);
    });
  });

  test('error', async () => {
    const { result } = renderHook(() => useInfinitePagination('error test', errorFetcher, 10));
    await act(async () => {
      await timeout(150);
      await result.current[1].loadMore();
      await timeout(150);
      expect(result.current[0].length).toStrictEqual(10);
      expect(result.current[1].isLoading).toEqual(true);
      expect(result.current[1].isReachingEnd).toEqual(false);
    });
  });
});

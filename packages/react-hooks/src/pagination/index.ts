import { useMemo } from 'react';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';

export function useInfinitePagination<T, P = Record<string, unknown>>(
  key: string,
  fetcher: (current: number, pageSize: number, params?: P) => Promise<T[]>,
  pageSize: number,
  params?: P,
  options?: SWRInfiniteConfiguration,
) {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<T[], P>(
    (current) => [key, current + 1, pageSize, params],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (_, current, innerPageSize, innerParams) => fetcher(current, innerPageSize, innerParams),
    options,
  );

  const returnObj = useMemo(() => {
    const isLoadingInitialData = !data && !error;
    const isLoading = isLoadingInitialData || !!(size > 0 && data && typeof data[size - 1] === 'undefined');
    const isEmpty = data?.[0]?.length === 0;
    const isRefreshing = isValidating && !!(data && data.length === size);
    const isReachingEnd = isEmpty || !!(data && data[data.length - 1].length < pageSize);

    const loadMore = async () => {
      if (!isLoading && !isReachingEnd) {
        await setSize(size + 1);
      }
    };

    const reset = async () => {
      await setSize(1);
    };

    return {
      refresh: mutate,
      loadMore,
      reset,
      isLoading,
      isEmpty,
      isReachingEnd,
      isRefreshing,
    };
  }, [data, error, size, pageSize, isValidating, mutate, setSize]);

  return [
    data ? ([] as T[]).concat(...data) : [],
    {
      ...returnObj,
    },
  ] as const;
}

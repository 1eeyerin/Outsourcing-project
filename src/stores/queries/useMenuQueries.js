import { useInfiniteQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { fetchMenus } from '@/supabase/menu';
import { QUERY_KEYS } from './constants';

export const useInfiniteFetchMenus = (category) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.MENUS(category),
    getNextPageParam: (lastPage, allPages) => {
      if (isEmpty(lastPage)) return undefined;
      return allPages.length * 10;
    },
    queryFn: ({ pageParam }) => fetchMenus({ category, pageParam }),
    select: (data) => data.pages.flat(),
    enabled: !!category,
    staleTime: 3600 * 1000,
    cacheTime: 3600 * 1000
  });
};

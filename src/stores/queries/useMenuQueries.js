import { useQuery } from '@tanstack/react-query';
import { fetchMenus } from '@/supabase/menu';
import { QUERY_KEYS } from './constants';

export const useFetchMenus = (category) => {
  return useQuery({
    queryKey: QUERY_KEYS.MENUS(category),
    queryFn: () => fetchMenus(category),
    enabled: !!category,
    staleTime: 3600 * 1000,
    cacheTime: 3600 * 1000
  });
};

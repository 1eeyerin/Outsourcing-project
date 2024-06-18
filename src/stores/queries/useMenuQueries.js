import { useQuery } from '@tanstack/react-query';
import { fetchMenus } from '@/supabase/menu';

export const useFetchMenus = (category) => {
  return useQuery({
    queryKey: ['menus', category],
    queryFn: () => fetchMenus(category),
    enabled: !!category
  });
};

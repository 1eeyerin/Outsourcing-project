import { useQuery } from '@tanstack/react-query';
import { fetchAllMenus } from '@/supabase/menu';

export const useFetchAllMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: fetchAllMenus
  });
};

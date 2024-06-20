import supabase from '../supabase/supabaseClient';
import { handleSupabaseRequest } from './request';

export const fetchMenus = async ({ category, pageParam = 0 }) => {
  if (category === 'all') {
    const { data, error } = await supabase
      .from('menus')
      .select('title, content, thumbnail, category', { count: 'exact' })
      .range(pageParam, pageParam + 3);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from('menus')
      .select('title, content, thumbnail', { count: 'exact' })
      .eq('category', category)
      .range(pageParam, pageParam + 3);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
};

export const fetchLimitedMenus = (num = 4) => {
  return handleSupabaseRequest(supabase.from('menus').select('title, content, thumbnail').limit(num));
};

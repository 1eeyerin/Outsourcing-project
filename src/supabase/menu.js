import supabase from '../supabase/supabaseClient';
import { handleSupabaseRequest } from './request';

export const fetchMenus = async (category) => {
  if (category === 'all') {
    const { data, error } = await supabase.from('menus').select('title, content, thumbnail, category');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } else {
    const { data, error } = await supabase.from('menus').select('title, content, thumbnail').eq('category', category);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
};

export const fetchLimitedMenus = (num = 4) => {
  return handleSupabaseRequest(supabase.from('menus').select('title, content, thumbnail').limit(num));
};

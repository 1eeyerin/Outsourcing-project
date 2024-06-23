import { handleApiRequest } from './request';
import supabase from './supabaseClient';

const COMMON_FIELDS = ['title', 'content', 'thumbnail', 'id'].join(', ');

export const fetchAllMenus = async ({ pageParam = 0, limit = 4 }) => {
  return handleApiRequest(
    supabase
      .from('menus')
      .select(`${COMMON_FIELDS}, category`)
      .range(pageParam, pageParam + (limit - 1))
  );
};

export const fetchCategoryMenus = async ({ category, pageParam = 0, limit = 4 }) => {
  return handleApiRequest(
    supabase
      .from('menus')
      .select(COMMON_FIELDS)
      .eq('category', category)
      .range(pageParam, pageParam + (limit - 1))
  );
};

export const fetchLimitedMenus = (num = 4) => {
  return handleApiRequest(supabase.from('menus').select('title, content, thumbnail').limit(num));
};

import supabase from '../supabase/supabaseClient';

export const fetchAllMenus = async () => {
  const { data, error } = await supabase.from('menus').select('title, content, thumbnail, category');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

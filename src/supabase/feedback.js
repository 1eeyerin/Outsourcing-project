import { handleSupabaseRequest } from './request';
import supabase from './supabaseClient';

const FEEDBACK = 'feedback';

export const getFeedbacks = ({ pageParam = 0, limit = 4 }) => {
  return handleSupabaseRequest(
    supabase
      .from(FEEDBACK)
      .select('*')
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + (limit - 1))
  );
};

export const getFeedback = (id) => {
  return handleSupabaseRequest(
    supabase.from(FEEDBACK).select('*').eq('id', id).order('created_at', { ascending: false })
  );
};

export const getFeedbackPassword = (id) => {
  return handleSupabaseRequest(supabase.from(FEEDBACK).select('password').match({ id }));
};

export const addFeedback = (content) => {
  return handleSupabaseRequest(supabase.from(FEEDBACK).insert(content));
};

export const deleteFeedback = (id) => {
  return handleSupabaseRequest(supabase.from(FEEDBACK).delete().match({ id }));
};

export const updateFeedback = ({ id, content }) => {
  return handleSupabaseRequest(supabase.from(FEEDBACK).update(content).match({ id }));
};

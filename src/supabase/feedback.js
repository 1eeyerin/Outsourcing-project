import supabase from './supabaseClient';

const FEEDBACK = 'feedback';

const handleSupabaseRequest = async (request) => {
  const { data, error } = await request;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const showFeedback = () => {
  return handleSupabaseRequest(supabase.from(FEEDBACK).select('*').order('created_at', { ascending: false }));
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

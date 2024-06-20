export const handleSupabaseRequest = async (request) => {
  const { data, error } = await request;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

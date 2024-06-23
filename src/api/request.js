export const handleApiRequest = async (request) => {
  const { data, error } = await request;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

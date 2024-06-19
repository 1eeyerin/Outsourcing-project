import supabase from './supabaseClient';

// 새로운 게시글 추가
export const feedbackAddlogin = async (name, password, title, content) => {
  const { data, error } = await supabase
    .from('feedback')
    .insert({
      name,
      password,
      title,
      content
    })
    .select('*');
  if (error) console.log('게시글 추가 에러:', error);
  else {
    console.log(data);
    return data;
  }
};
export const feedbackAdd = async (title, content, loginId) => {
  const { data, error } = await supabase
    .from('feedback')
    .update({
      title,
      content
    })
    .eq('id', loginId);

  if (error) console.log('게시글 추가 에러:', error);
  else {
    return data;
  }
};

export const feedbackDelete = async (posts) => {
  const [id] = posts;
  const { error } = await supabase.from('feedback').delete().eq('id', id);

  if (error) console.log('게시글 삭제 에러:', error);
  else {
    const updatedPosts = posts.filter((post) => post.id !== id);
    console.log(updatedPosts);
  }
};

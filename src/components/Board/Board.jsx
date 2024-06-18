import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/supabase/supabaseClient';
const Board = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  // 초기 데이터 로딩
  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 불러오기
  const fetchPosts = async () => {
    let { data, error } = await supabase.from('feedback').select('*').order('created_at', { ascending: false });
    if (error) console.log('게시글 불러오기 에러:', error);
    else setPosts(data);
  };
  const handleAdd = () => {
    navigate('1');
  };

  return (
    <div>
      <h1>게시판</h1>
      <button onClick={handleAdd}>게시글 추가</button>
      {posts.map((post) => (
        <div key={post.id}>
          <div>{post.name}</div>
          <div>{post.title}</div>
          <div>{post.content}</div>
          <div>{post.created_at}</div>
        </div>
      ))}
    </div>
  );
};

export default Board;

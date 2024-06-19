import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '@/supabase/supabaseClient';

const StcontainerBox = styled.div`
  width: 1400px;
  height: 816px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  padding: 48px 0 32px;
}
`;
const Stbutton = styled.button`
  width: 60px;
  height: 60px;
  flex-grow: 0;
  padding: 15px;
  border: solid 0 #e5e7eb;
  background-color: #3b7dff;
  border-radius: 60px;
  position: fixed;
  top: 609px;
  right: 174px;

  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const StcontentBox = styled.div`
  height: 166px;
  align-self: stretch;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  border-radius: 12px;
  background-color: #11151b;
  & > span:nth-child(1) {
    height: 24px;
    flex-grow: 1;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  & > span:nth-child(2) {
    height: 19px;
    flex-grow: 1;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #727272;
  }
`;
const StspanDiv = styled.div`
  width: 140px;
  height: 51px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  padding: 32px 0 0;
  & > span:nth-child(1) {
    width: 42px;
    height: 19px;
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  & > span:nth-child(2) {
    width: 82px;
    height: 19px;
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #727272;
  }
`;
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
    navigate('/feedback/write');
  };

  const getDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}. ${newDate.getMonth() > 10 ? '' : '0'}${newDate.getMonth() + 1}. ${newDate.getDate() > 9 ? '' : '0'}${newDate.getDate()}`;
  };
  return (
    <StcontainerBox>
      {posts.map((post) => (
        <StcontentBox key={post.id}>
          <span>{post.title}</span>
          <span>{post.content}</span>
          <StspanDiv>
            <span>{post.name}</span>
            <span>{getDate(post.created_at)}</span>
          </StspanDiv>
        </StcontentBox>
      ))}
      <Stbutton onClick={handleAdd}>+</Stbutton>
    </StcontainerBox>
  );
};

export default Board;

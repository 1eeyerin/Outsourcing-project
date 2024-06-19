import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ellipsisStyle } from '@/styles/utils';
import { showFeedback } from '@/supabase/feedback';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const showFeedbackData = async () => {
    const getData = await showFeedback();
    setPosts(getData);
  };

  const getDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}. ${newDate.getMonth() > 10 ? '' : '0'}${newDate.getMonth() + 1}. ${newDate.getDate() > 9 ? '' : '0'}${newDate.getDate()}`;
  };

  const handleAdd = () => {
    navigate('/feedback/write');
  };

  useEffect(() => {
    showFeedbackData();
  }, []);

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
  bottom: 40px;
  right: 174px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const StcontentBox = styled.div`
  align-self: stretch;
  flex-grow: 0;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  border-radius: 12px;
  background-color: #11151b;

  & > span:nth-child(1) {
    flex-grow: 1;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    ${ellipsisStyle(1)}
  }
  & > span:nth-child(2) {
    flex-grow: 1;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    color: #727272;
    ${ellipsisStyle(1)}
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
    max-width: 1230px;
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;

    ${ellipsisStyle(1)}
  }
  & > span:nth-child(2) {
    flex-shrink: 0;
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: #727272;
    ${ellipsisStyle(1)}
  }
`;

export default Board;

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <StContainerBox>
      {posts.map((post) => (
        <StContentBox key={post.id} to={`/feedback/${post.id}/password-check`}>
          <span>{post.title}</span>
          <span>{post.content}</span>
          <StSpanDiv>
            <span>{post.name}</span>
            <span>{getDate(post.created_at)}</span>
          </StSpanDiv>
        </StContentBox>
      ))}
      <StButton onClick={handleAdd}>+</StButton>
    </StContainerBox>
  );
};
const StContainerBox = styled.div`
  width: 1400px;
  height: 816px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 24px;
  padding: 48px 0 32px;
`;
const StButton = styled.button`
  width: 60px;
  height: 60px;
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

const StContentBox = styled(Link)`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  border-radius: 12px;
  background-color: #11151b;

  & > span:nth-child(1) {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    ${ellipsisStyle(1)}
  }
  & > span:nth-child(2) {
    font-size: 16px;
    font-weight: 500;
    color: #727272;
    ${ellipsisStyle(1)}
  }
`;
const StSpanDiv = styled.div`
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

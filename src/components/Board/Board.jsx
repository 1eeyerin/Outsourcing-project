import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ellipsisStyle, respondTo } from '@/styles/utils';
import { useInfiniteGetFeedbacks } from '@/stores/queries/useFeedbackQueries';
import InfiniteScroll from '../InfiniteScroll';

const getDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}. ${newDate.getMonth() > 10 ? '' : '0'}${newDate.getMonth() + 1}. ${newDate.getDate() > 9 ? '' : '0'}${newDate.getDate()}`;
};

const Board = () => {
  const navigate = useNavigate();

  const { data: posts = [], fetchNextPage, hasNextPage } = useInfiniteGetFeedbacks({ limit: 4 });

  const handleAdd = () => {
    navigate('/feedback/write');
  };

  return (
    <StContainerBox>
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
        {posts.map((post) => (
          <li key={post.id}>
            <StContentBox to={`/feedback/${post.id}/password-check`}>
              <span>{post.title}</span>
              <span>{post.content}</span>
              <StSpanDiv>
                <span>{post.name}</span>
                <span>{getDate(post.created_at)}</span>
              </StSpanDiv>
            </StContentBox>
          </li>
        ))}
      </InfiniteScroll>
      <StButton onClick={handleAdd}>+</StButton>
    </StContainerBox>
  );
};

const StContainerBox = styled.ul`
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 48px 0 32px;

  ${respondTo.desktop(css`
    padding: 48px 20px;
  `)}
`;
const StButton = styled.button`
  width: 60px;
  height: 60px;
  padding: 15px;
  border: solid 0 #e5e7eb;
  background-color: #3b7dff;
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  right: 40px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const StContentBox = styled(Link)`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
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
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 32px 0 0;

  & > span:nth-child(1) {
    max-width: 100px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    flex-shrink: 0;

    ${ellipsisStyle(1)}
  }

  & > span:nth-child(2) {
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 500;
    color: #727272;
    ${ellipsisStyle(1)};
  }
`;

export default Board;

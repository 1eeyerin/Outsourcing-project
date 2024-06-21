import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Button';
import SectionTitle from '@/components/Typography/SectionTitle';
import { ellipsisStyle } from '@/styles/utils';
import { useDeleteFeedback, useGetFeedback } from '@/stores/queries/useFeedbackQueries';

const FeedbackDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useGetFeedback(id);
  const { mutate: deleteFeedbackMutation } = useDeleteFeedback(id);

  if (isPending) return null;

  return (
    <>
      <StTypographyWrapper>
        <SectionTitle size="l" weight="700">
          고객의 소리
        </SectionTitle>
      </StTypographyWrapper>
      <StArticle>
        <StText>{data.title}</StText>
        <StText>
          <div>{data.name}</div>
        </StText>
        <StContent>{data.content}</StContent>
      </StArticle>
      <StButtons>
        <Button variant="rounded" onClick={() => navigate('/feedback')}>
          목록으로
        </Button>
        <StRow>
          <Button variant="rounded" href={`/feedback/${id}/edit`}>
            수정하기
          </Button>
          <Button variant="rounded" onClick={() => deleteFeedbackMutation(id)}>
            삭제하기
          </Button>
        </StRow>
      </StButtons>
    </>
  );
};

const StTypographyWrapper = styled.div`
  margin-top: 56px;
`;

const StRow = styled.div`
  display: flex;
  gap: 10px;
`;

const StButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  gap: 10px;
`;

const StArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StText = styled.div`
  padding: 24px 32px;
  border-radius: 12px;
  background-color: #11151b;
  font-size: 18px;
  font-weight: 500;
  color: #c6c6c6;

  div {
    ${ellipsisStyle(1)};
  }
`;

const StContent = styled.p`
  padding: 24px 32px;
  border-radius: 12px;
  background-color: #11151b;
  font-size: 18px;
  font-weight: 500;
  color: #c6c6c6;
  min-height: 250px;
  width: 100%;
  line-height: 140%;
`;

export default FeedbackDetail;

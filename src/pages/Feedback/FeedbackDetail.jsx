import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { Button } from '@/components/Button';
import { deleteFeedback, getFeedback } from '@/supabase/feedback';

const FeedbackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ['feedback', id],
    queryFn: () => getFeedback(117),
    select: (data) => data[0]
  });

  const { mutate: deleteFeedbackMutation } = useMutation({
    mutationFn: () => deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      navigate(-1);
    }
  });

  const handleDeleteFeedback = () => {
    deleteFeedbackMutation(id);
  };

  if (isPending) return null;

  return (
    <div>
      <StArticle>
        <StText>{data.title}</StText>
        <StText>{data.name}</StText>
        <StContent>{data.content}</StContent>
      </StArticle>
      <StButtons>
        <Button variant="rounded">목록으로</Button>
        <StRow>
          <Button variant="rounded" href={`/feedback/${id}/edit`}>
            수정하기
          </Button>
          <Button variant="rounded" onClick={handleDeleteFeedback}>
            삭제하기
          </Button>
        </StRow>
      </StButtons>
    </div>
  );
};

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

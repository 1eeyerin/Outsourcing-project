import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Button';

const FeedbackError = () => {
  const navigate = useNavigate();

  return (
    <StWrapper>
      <StEmptyText>
        올바르지 않은 접근이에요
        <br />
        다시 시도해주세요
      </StEmptyText>
      <Button type="button" variant="rounded" onClick={() => navigate('/feedback')}>
        뒤로가기
      </Button>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const StEmptyText = styled.div`
  margin-top: 48px;
  text-align: center;
  line-height: 1.4;
`;

export default FeedbackError;

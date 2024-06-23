import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Button';
import { Input } from '@/components/Form';
import SectionTitle from '@/components/Typography/SectionTitle';
import { useGetFeedbackPassword } from '@/stores/queries/useFeedbackQueries';

const PasswordCheck = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: password } = useGetFeedbackPassword(id);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { password: inputPassword } = Object.fromEntries(formData.entries());

    if (password !== inputPassword) {
      alert('비밀번호가 일치하지 않아요, 다시 확인해주세요');
      return;
    }

    navigate(`/feedback/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StTypographyWrapper>
        <SectionTitle size="l" weight="700">
          고객의 소리
        </SectionTitle>
      </StTypographyWrapper>
      <StGuideText>
        비밀글이에요
        <br />
        비밀번호를 입력해주세요
      </StGuideText>
      <StInputWrapper>
        <Input type="password" name="password" placeholder="비밀번호 입력" />
        <StButtonWrapper>
          <Button type="button" variant="rounded" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
          <Button type="submit" variant="rounded">
            비밀번호 확인
          </Button>
        </StButtonWrapper>
      </StInputWrapper>
    </form>
  );
};

const StTypographyWrapper = styled.div`
  margin-top: 56px;
`;

const StGuideText = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
  color: #adadad;
`;

const StInputWrapper = styled.div`
  margin-top: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  input {
    max-width: 450px;
    width: 100%;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export default PasswordCheck;

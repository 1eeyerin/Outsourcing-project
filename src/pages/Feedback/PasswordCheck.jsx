import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Button';
import Input from '@/components/Input';
import { useGetFeedbackPassword } from '@/stores/queries/useFeedbackQueries';

const PasswordCheck = () => {
  const navigate = useNavigate();
  const { data: password } = useGetFeedbackPassword(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { password: inputPassword } = Object.fromEntries(formData.entries());

    if (password !== inputPassword) {
      alert('비밀번호가 일치하지 않아요, 다시 확인해주세요');
      return;
    }

    navigate('/feedback/1');
  };

  return (
    <form onSubmit={handleSubmit}>
      <StGuideText>
        비밀글이에요
        <br />
        비밀번호를 입력해주세요
      </StGuideText>
      <StInputWrapper>
        <Input type="password" placeholder="비밀번호 입력" />
        <Button type="submit" variant="rounded">
          비밀번호 확인
        </Button>
      </StInputWrapper>
    </form>
  );
};

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
    width: 450px;
  }
`;

export default PasswordCheck;

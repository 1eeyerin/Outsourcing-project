import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';

const FeedbackForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <StInputs>
        <StInputRow>
          <Input placeholder="닉네임" />
          <Input type="email" placeholder="이메일" />
          <Input type="password" placeholder="비밀번호" />
          <Input type="password" placeholder="비밀번호 확인" />
        </StInputRow>
        <Input placeholder="제목" css={inputStyle} />
        <Textarea placeholder="내용" />
      </StInputs>
      <StButtons>
        <Button variant="rounded">작성하기</Button>
      </StButtons>
    </form>
  );
};

const StButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 48px;
`;

const StInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StInputRow = styled.div`
  display: flex;
  gap: 16px;

  input {
    width: calc(25% - 48px);
    flex-grow: 1;
  }
`;

const inputStyle = css`
  width: 100%;
`;

export default FeedbackForm;

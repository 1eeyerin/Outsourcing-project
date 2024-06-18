import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import Input from '@/components/Input';

const PasswordCheck = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <StGuideText>
        비밀글이에요
        <br />
        비밀번호를 입력해주세요
      </StGuideText>
      <StInputWrapper>
        <Input type="password" placeholder="비밀번호 입력" css={inputStyle} />
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
`;

const inputStyle = css`
  width: 450px;
`;

export default PasswordCheck;

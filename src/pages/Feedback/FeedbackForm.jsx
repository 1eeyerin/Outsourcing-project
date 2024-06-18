import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';

const FeedbackForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['feedback', id])?.[0] || {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <StInputs>
        <StInputRow>
          <Input placeholder="닉네임" defaultValue={data?.name} readOnly />
          <Input type="email" placeholder="이메일" defaultValue={data?.email} readOnly />
          <Input type="password" placeholder="비밀번호" required />
          <Input type="password" placeholder="비밀번호 확인" required />
        </StInputRow>
        <Input placeholder="제목" css={inputStyle} defaultValue={data?.title} required />
        <Textarea placeholder="내용" defaultValue={data?.content} required />
      </StInputs>
      <StButtons>
        <Button type="submit" variant="rounded">
          작성하기
        </Button>
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

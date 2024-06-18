import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { updateFeedback } from '@/supabase/feedback';

const FeedbackForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['feedback', id])?.[0] || {};

  const { mutate: updateMutation } = useMutation({
    mutationFn: (content) => updateFeedback({ id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback', id] });
    },
    enabled: !!id
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { name, email, password, passwordConfirm, title, content } = Object.fromEntries(formData.entries());

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않아요.');
      return;
    }

    // TODO : 생성할땐 제외
    if (password !== data.password) {
      alert('작성하신 비밀번호가 아니에요.');
      return;
    }

    updateMutation({ name, email, password, title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <StInputs>
        <StInputRow>
          <Input placeholder="닉네임" name="name" defaultValue={data?.name} readOnly />
          <Input type="email" placeholder="이메일" name="email" defaultValue={data?.email} readOnly />
          <Input type="password" placeholder="비밀번호" name="password" required />
          <Input type="password" placeholder="비밀번호 확인" name="passwordConfirm" required />
        </StInputRow>
        <Input placeholder="제목" css={inputStyle} name="title" defaultValue={data?.title} required />
        <Textarea placeholder="내용" name="content" defaultValue={data?.content} required />
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

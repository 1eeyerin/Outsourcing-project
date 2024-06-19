import { useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { useAddFeedback, useGetFeedbackFromQueries, useUpdateFeedback } from '@/stores/queries/useFeedbackQueries';

const FeedbackForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const data = useGetFeedbackFromQueries(id);
  const { mutate: updateMutation } = useUpdateFeedback(id);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { name, email, password, passwordConfirm, title, content } = Object.fromEntries(formData.entries());

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않아요');
      return;
    }

    if (isEdit && password !== data.password) {
      alert('작성하신 비밀번호가 아니에요');
      return;
    }

    const fetchQueries = isEdit ? updateMutation : useAddFeedback;
    fetchQueries({ name, email, password, title, content });
  };

  if (isEdit && isEmpty(data)) {
    return (
      <StEmptyText>
        올바르지 않은 접근이에요
        <br />
        다시 시도해주세요
      </StEmptyText>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <StInputs>
        <StInputRow>
          <Input placeholder="닉네임" name="name" defaultValue={data?.name} readOnly={isEdit} />
          <Input type="email" placeholder="이메일" name="email" defaultValue={data?.email} readOnly={isEdit} />
          <Input type="password" placeholder="비밀번호" name="password" required={isEdit} />
          <Input type="password" placeholder="비밀번호 확인" name="passwordConfirm" required={isEdit} />
        </StInputRow>
        <Input placeholder="제목" css={inputStyle} name="title" defaultValue={data?.title} required={isEdit} />
        <Textarea placeholder="내용" name="content" defaultValue={data?.content} required={isEdit} />
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

const StEmptyText = styled.div`
  margin-top: 48px;
  text-align: center;
  line-height: 1.4;
`;

export default FeedbackForm;

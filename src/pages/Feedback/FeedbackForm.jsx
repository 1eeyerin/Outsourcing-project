import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { Typography } from '@/components/Typography';
import { useAddFeedback, useGetFeedbackFromQueries, useUpdateFeedback } from '@/stores/queries/useFeedbackQueries';
import FeedbackError from './FeedbackError';

const FeedbackForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const data = useGetFeedbackFromQueries(id);
  const { mutate: updateMutation } = useUpdateFeedback(id, { enabled: !isEdit });
  const { mutate: addMutation } = useAddFeedback({ enabled: isEdit });

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

    const fetchQueries = isEdit ? updateMutation : addMutation;
    fetchQueries({ name, email, password, title, content });
  };

  if (isEdit && isEmpty(data)) {
    return <FeedbackError />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <StTypographyWrapper>
        <Typography size="l" weight="b">
          고객의소리
        </Typography>
      </StTypographyWrapper>
      <StInputs>
        <StInputRow>
          <Input placeholder="닉네임" name="name" defaultValue={data.name} readOnly={isEdit} />
          <Input type="email" placeholder="이메일" name="email" defaultValue={data.email} readOnly={isEdit} />
          <Input type="password" placeholder="비밀번호" name="password" required={isEdit} />
          <Input type="password" placeholder="비밀번호 확인" name="passwordConfirm" required={isEdit} />
        </StInputRow>
        <Input placeholder="제목" css={inputStyle} name="title" defaultValue={data.title} required={isEdit} />
        <Textarea placeholder="내용" name="content" defaultValue={data.content} required={isEdit} />
      </StInputs>
      <StButtons>
        <Button type="button" variant="rounded" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
        <Button type="submit" variant="rounded">
          {isEdit ? '수정하기' : '작성하기'}
        </Button>
      </StButtons>
    </form>
  );
};

const StTypographyWrapper = styled.div`
  margin-top: 56px;
`;

const StButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  gap: 16px;
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

import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import styled, { css } from 'styled-components';
import Button from '@/components/Button';
import { Textarea, Input } from '@/components/Form';
import SectionTitle from '@/components/Typography/SectionTitle';
import { respondTo } from '@/styles/theme';
import { useAddFeedback, useGetFeedbackFromQueries, useUpdateFeedback } from '@/stores/queries/useFeedbackQueries';
import FeedbackError from './FeedbackError';

const FeedbackForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const data = useGetFeedbackFromQueries(id);
  const { mutate: updateMutation } = useUpdateFeedback({
    id,
    onSuccess: () => {
      alert('수정되었어요');
      navigate(`/feedback/${id}`);
    }
  });
  const { mutate: addMutation } = useAddFeedback({
    onSuccess: () => {
      alert('작성이 완료되었어요');
      navigate('/feedback');
    }
  });

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
        <SectionTitle size="l" weight="700">
          고객의 소리
        </SectionTitle>
      </StTypographyWrapper>
      <StInputs>
        <StInputRow>
          <Input placeholder="닉네임" name="name" defaultValue={data.name} readOnly={isEdit} required />
          <Input type="email" placeholder="이메일" name="email" defaultValue={data.email} readOnly={isEdit} required />
          <Input type="password" placeholder="비밀번호" name="password" required />
          <Input type="password" placeholder="비밀번호 확인" name="passwordConfirm" required />
        </StInputRow>
        <Input placeholder="제목" css={inputStyle} name="title" defaultValue={data.title} required />
        <Textarea placeholder="내용" name="content" defaultValue={data.content} required />
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

  ${respondTo.mobile(css`
    flex-direction: column;

    input {
      width: 100%;
    }
  `)}
`;

const inputStyle = css`
  width: 100%;
`;

export default FeedbackForm;

import styled from 'styled-components';
import Board from '@/components/Board';
import SectionTitle from '@/components/Typography/SectionTitle';

const Feedback = () => {
  return (
    <StContainer>
      <SectionTitle size="l" weight="700">
        고객의 소리
      </SectionTitle>
      <Board />
    </StContainer>
  );
};

const StContainer = styled.div`
  max-width: 1440px;
`;

export default Feedback;

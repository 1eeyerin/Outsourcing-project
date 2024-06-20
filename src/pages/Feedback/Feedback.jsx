import styled from 'styled-components';
import Board from '@/components/Board';
import SectionTitle from '@/components/Typography/SectionTitle';

const Feedback = () => {
  return (
    <StContainer>
      <StTitleDiv>
        <StSpan>고객의 소리</StSpan>
      </StTitleDiv>
      <Board />
    </StContainer>
  );
};

const StContainer = styled.div`
  max-width: 1440px;
  h1 {
    font-size: 30px;
  }
`;

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


const StTitleDiv = styled.div`
  text-align: center;
`;

const StSpan = styled.span`
  font-size: 24px;
  font-weight: bold;
  line-height: 1.4;
  color: #fff;
`;

export default Feedback;

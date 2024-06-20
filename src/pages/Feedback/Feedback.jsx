import styled from 'styled-components';
import Board from '@/components/Board';

const StContainer = styled.div`
  max-width: 1440px;
  h1 {
    font-size: 30px;
  }
`;
const StTitleDiv = styled.div`
  width: 1440px;
  height: 150px;
  text-align: center;
`;
const StSpan = styled.span`
  width: 104px;
  height: 34px;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: normal;
  color: #fff;
`;
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

export default Feedback;

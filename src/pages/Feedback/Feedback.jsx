import styled from 'styled-components';
import Board from '@/components/Board';

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

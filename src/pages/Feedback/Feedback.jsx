import styled from 'styled-components';
import Board from '@/components/Board';

const Stcontainer = styled.div`
  max-width: 1440px;
  h1 {
    font-size: 30px;
  }
`;
const Sttitlediv = styled.div`
  width: 1440px;
  height: 150px;
  text-align: center;
`;
const Stspan = styled.span`
  width: 104px;
  height: 34px;
  flex-grow: 0;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;
const Feedback = () => {
  return (
    <Stcontainer>
      <Sttitlediv>
        <Stspan>고객의 소리</Stspan>
      </Sttitlediv>
      <Board />
    </Stcontainer>
  );
};

export default Feedback;

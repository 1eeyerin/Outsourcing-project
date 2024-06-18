import styled from 'styled-components';

const MenuItem = ({ menu }) => (
  <StMenuItem>
    <StImage src={menu.thumbnail} alt={menu.title} />
    <StContent className="description">
      <h3>{menu.title}</h3>
      <content>{menu.content}</content>
    </StContent>
  </StMenuItem>
);

const StMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3efe6;
  width: 340px;
  height: 520px;
  margin-bottom: 20px;
  transition: transform 0.5s, background-image 0.5s;
  cursor: pointer;
  .description {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover {
    transform: scale(1.03);

    .description {
      opacity: 1;
    }
  }
`;

const StImage = styled.img`
  margin: auto 0;
  margin-top: 80px;
`;

const StContent = styled.div`
  padding: 0 0 33px 34.8px;
  color: black;
  background-image: linear-gradient(to bottom, rgba(243, 239, 230, 0), #f3efe6);
  h3 {
    margin: 0 6.8px 5px 0.3px;
    font-family: Pretendard;
    font-size: 28px;
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }

  p {
    margin-top: 5px;
    font-size: 20px;
    color: #555;
  }
`;
export default MenuItem;

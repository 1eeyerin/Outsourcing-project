import styled from 'styled-components';

const MenuItem = ({ menu }) => (
  <StMenuItem>
    <StImageWrapper>
      <img src={menu.thumbnail} alt={menu.title} />
    </StImageWrapper>
    <StContentWrapper className="description">
      <StMenuTitle>{menu.title}</StMenuTitle>
      <StMenuContent>{menu.content}</StMenuContent>
    </StContentWrapper>
  </StMenuItem>
);
const StImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: #f3efe6;
  width: 340px;
  height: 520px;
  position: relative;
  transition: transform 0.5s;
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
  ::after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
`;

const StContentWrapper = styled.div`
  width: 100%;
  padding: 0 0 33px 20px;
`;

const StMenuTitle = styled.h4`
  margin: 0 6.8px 5px 0.3px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.4;
  text-align: left;
  color: #000000;
`;

const StMenuContent = styled.p`
  margin-top: 5px;
  font-size: 20px;
  color: #777777;
`;

export default MenuItem;

import styled, { css } from 'styled-components';
import { ellipsisStyle, respondTo } from '@/styles/utils';

const MenuItem = ({ menu, as = 'div' }) => (
  <StMenuItem as={as}>
    <StImageWrapper className="imageBox">
      <img src={menu.thumbnail} alt={menu.title} />
    </StImageWrapper>
    <StContentWrapper className="description">
      <StMenuTitle className="menu-title">{menu.title}</StMenuTitle>
      <StMenuContent className="menu-content">{menu.content}</StMenuContent>
    </StContentWrapper>
  </StMenuItem>
);

const StImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: transform 0.5s;
`;

const StMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: #f3efe6;
  aspect-ratio: 2/3;
  position: relative;
  overflow: hidden;

  .menu-title {
    opacity: 0;
  }
  .menu-content {
    opacity: 0;
  }
  &:hover .menu-title {
    transform: translate(0, 0);
    opacity: 1;
  }
  &:hover .menu-content {
    transform: translateY(0);
    opacity: 1;
  }
  .description {
    opacity: 0;
    transition: opacity 0.7s;
  }
  &:hover {
    .description {
      opacity: 1;
    }
    .imageBox {
      transform: scale(1.03);
    }
    &::after {
      opacity: 1;
    }
  }
  &::after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 20%);
    z-index: 1;
    transition: 0.4s;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StContentWrapper = styled.div`
  padding: 0 16px 33px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(243, 239, 230, 0), #f3efe6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  z-index: 2;
`;

const StMenuTitle = styled.strong`
  margin: 0 6.8px 5px 0.3px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.4;
  color: #000000;
  transform: translate(0, 100px);
  word-break: keep-all;
  transition:
    opacity 0.2s,
    transform 0.4s;

  ${respondTo.mobile(css`
    font-size: 20px;
  `)}
`;

const StMenuContent = styled.p`
  margin-top: 5px;
  font-size: 20px;
  color: #777777;
  ${ellipsisStyle(1)};
  transform: translate(0, 100px);
  transition:
    opacity 0.1s,
    transform 0.8s;

  ${respondTo.mobile(css`
    font-size: 15px;
  `)}
`;

export default MenuItem;

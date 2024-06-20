import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = ({ css }) => {
  return (
    <StHeader $css={css}>
      <StContents>
        <StLink to="/">
          <StHeading>
            <StStrong>1943</StStrong>
            <StSpan>classic</StSpan>
          </StHeading>
        </StLink>
        <StyledNav>
          <li>
            <Link to="/menu">메뉴</Link>
          </li>
          <li>
            <Link to="/store">매장찾기</Link>
          </li>
          <li>
            <Link to="/feedback">고객의소리</Link>
          </li>
        </StyledNav>
      </StContents>
    </StHeader>
  );
};

const StHeader = styled.header`
  height: 118px;
  background-color: #000000;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 24px 0;
  ${({ $css }) => $css};
`;

const StContents = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const StLink = styled(Link)`
  color: var(--color-white);
  height: 100%;
  display: flex;
  align-items: center;
  white-space: break-spaces;
  font-size: 22px;
`;

const StHeading = styled.h1`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StStrong = styled.strong`
  font-weight: 600;
  color: #ffffff;
  font-size: 24px;
`;

const StSpan = styled.span`
  font-weight: 300;
  color: #e0e0e0;
  font-size: 15px;
`;

const StyledNav = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 16px;
  font-weight: 300;
`;

export default Header;

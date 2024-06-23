import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Typography } from '@/components/Typography';
import { respondTo } from '@/styles/theme';

const Header = ({ css }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StHeader $css={css}>
      <StContents>
        <StLink to="/">
          <StHeading>
            <StStrong>1943</StStrong>
            <StSpan>classic</StSpan>
          </StHeading>
        </StLink>
        <NavContainer>
          <StyledNav>
            <li>
              <Link to="/menu">
                <Typography size="s" as="span">
                  메뉴
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/store">
                <Typography size="s" as="span">
                  매장찾기
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/feedback">
                <Typography size="s" as="span">
                  고객의 소리
                </Typography>
              </Link>
            </li>
          </StyledNav>
          <HamburgerButton onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </HamburgerButton>
        </NavContainer>
      </StContents>
      {isMenuOpen && (
        <OverlayMenu>
          <StHeaderContainer>
            <StLink to="/" onClick={toggleMenu}>
              <StHeading>
                <StStrong>1943</StStrong>
                <StSpan>classic</StSpan>
              </StHeading>
            </StLink>
            <CloseButton onClick={toggleMenu}>&times;</CloseButton>
          </StHeaderContainer>
          <OverlayContent>
            <ul>
              <li>
                <Link to="/menu" onClick={toggleMenu}>
                  <Typography size="s" as="span">
                    메뉴
                  </Typography>
                </Link>
              </li>
              <li>
                <Link to="/store" onClick={toggleMenu}>
                  <Typography size="s" as="span">
                    매장찾기
                  </Typography>
                </Link>
              </li>
              <li>
                <Link to="/feedback" onClick={toggleMenu}>
                  <Typography size="s" as="span">
                    고객의 소리
                  </Typography>
                </Link>
              </li>
            </ul>
          </OverlayContent>
        </OverlayMenu>
      )}
    </StHeader>
  );
};

const StHeader = styled.header`
  height: 118px;
  background-color: #000000;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 24px 0;
  ${({ $css }) => $css};

  ${respondTo.desktop(css`
    padding: 0 20px;
  `)}
`;
const StyledNav = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 16px;
  font-weight: 300;

  ${respondTo.mobile(css`
    display: none;
  `)}
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

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;

  span {
    width: 24px;
    height: 2px;
    background: #ffffff;
    border-radius: 1px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  ${respondTo.mobile(css`
    display: flex;
  `)}
`;

const OverlayMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ul {
    list-style: none;
    margin: 26px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  li {
    margin-left: 20px;
    padding: 10px 0;
  }
`;

const StHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px 20px;
`;

export default Header;

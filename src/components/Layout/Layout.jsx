import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useScrollToTop from '@/hooks/useScrollToTop';
import { respondTo } from '@/styles/theme';
import Header from './Header';

const Layout = () => {
  useScrollToTop();

  return (
    <>
      <Header />
      <StLayout>
        <Outlet />
      </StLayout>
    </>
  );
};

const StLayout = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  ${respondTo.desktop(css`
    padding: 0 20px;
  `)}
`;

export default Layout;

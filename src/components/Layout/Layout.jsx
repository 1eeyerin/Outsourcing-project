import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import useScrollToTop from '@/hooks/useScrollToTop';
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

  @media (max-width: 1400px) {
    padding: 0 20px;
  }
`;

export default Layout;

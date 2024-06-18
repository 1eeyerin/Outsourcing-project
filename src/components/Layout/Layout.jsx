import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from './Header';

const Layout = () => {
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
`;

export default Layout;

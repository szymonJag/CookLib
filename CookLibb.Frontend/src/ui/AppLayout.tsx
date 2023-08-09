import { styled } from 'styled-components';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(40rem, 1fr) 5fr;
  height: 100vh;
`;

export const MainLayout = styled.main`
  padding: 2rem;
`;

function AppLayout() {
  return (
    <Layout>
      <Sidebar />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Layout>
  );
}

export default AppLayout;

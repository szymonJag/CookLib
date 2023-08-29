import { styled } from 'styled-components';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import UserInfo from './UserInfo';

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(30rem, 1fr) 5fr;
  height: 100vh;
`;

export const MainLayout = styled.main`
  padding: 2rem;
  overflow-y: auto;
`;

function AppLayout() {
  return (
    <Layout>
      <Sidebar />
      <MainLayout>
        <UserInfo />
        <Outlet />
      </MainLayout>
    </Layout>
  );
}

export default AppLayout;

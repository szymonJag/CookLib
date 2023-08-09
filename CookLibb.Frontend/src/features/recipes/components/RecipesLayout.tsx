import { styled } from 'styled-components';
import Heading from '../../../ui/Heading';
import UserInfo from '../../../ui/UserInfo';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

function RecipesLayout() {
  return (
    <Layout>
      <UserInfo />
      <Heading as='h1'>Lista przepisów</Heading>
    </Layout>
  );
}

export default RecipesLayout;

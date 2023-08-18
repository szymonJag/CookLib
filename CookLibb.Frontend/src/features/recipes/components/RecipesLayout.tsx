import { styled } from 'styled-components';
import RouteHeading from '../../../ui/RouteHeading';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

function RecipesLayout() {
  return (
    <Layout>
      <RouteHeading text='Lista przepisów' />
    </Layout>
  );
}

export default RecipesLayout;

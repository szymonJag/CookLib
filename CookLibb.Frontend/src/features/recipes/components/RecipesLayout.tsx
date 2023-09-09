import { styled } from 'styled-components';
import RouteHeading from '../../../ui/RouteHeading';
import RecipesList from './RecipesList';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

function RecipesLayout() {
  return (
    <Layout>
      <RouteHeading text='Lista przepisów' />
      <RecipesList />
    </Layout>
  );
}

export default RecipesLayout;

import { styled } from 'styled-components';
import RouteHeading from '../../../ui/RouteHeading';
import RecipesList from './RecipesList';
import { useQueryClient } from '@tanstack/react-query';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

function RecipesLayout() {
  const query = useQueryClient();

  query.invalidateQueries({
    queryKey: ['recipes'],
  });

  return (
    <Layout>
      <RouteHeading text='Lista przepisów' />
      <RecipesList />
    </Layout>
  );
}

export default RecipesLayout;

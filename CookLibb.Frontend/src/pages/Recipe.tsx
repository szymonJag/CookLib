import { useGetRecipe } from '../features/recipes/hooks/useGetRecipe';
import { IRecipe } from '../interfaces/IRecipe';
import Spinner from '../ui/Spinner';
import { useEffect, useState } from 'react';
import { DefaultRecipe } from '../utils/data';
import styled from 'styled-components';
import RecipePanel from '../features/recipe/components/RecipePanel';
import Heading from '../ui/Heading';
import RouteHeading from '../ui/RouteHeading';
import { PageContent } from '../ui/PageContent';

const RecipeLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

function Recipe() {
  const { isLoading, recipe } = useGetRecipe();
  const [fetchedRecipe, setFetchedRecipe] = useState<IRecipe>(DefaultRecipe);

  useEffect(() => {
    if (recipe) setFetchedRecipe(recipe);
  }, [recipe]);

  if (isLoading)
    return (
      <>
        <Heading as='h3'>{'Trwa ładowanie przepisu'}</Heading>
        <Spinner />
      </>
    );

  return (
    <RecipeLayout>
      <RouteHeading text={fetchedRecipe.name} />
      <PageContent>{recipe && <RecipePanel recipe={recipe} />}</PageContent>
    </RecipeLayout>
  );
}

export default Recipe;

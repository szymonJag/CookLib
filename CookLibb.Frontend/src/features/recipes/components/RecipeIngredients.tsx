import styled from 'styled-components';
import { formatIngredients } from '../../../utils/helpers';

const RecipeIngredientsLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface RecipeIngredientsProps {
  ingredients: string[];
}

function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  const formattedIngredients = formatIngredients(ingredients, 3);

  return (
    <RecipeIngredientsLayout>{formattedIngredients}</RecipeIngredientsLayout>
  );
}

export default RecipeIngredients;

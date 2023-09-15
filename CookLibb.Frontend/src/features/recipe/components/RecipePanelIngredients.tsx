import styled from 'styled-components';
import { IRecipeIngredient } from '../../../interfaces/IIngredient';
import Heading from '../../../ui/Heading';
import IngredientRow from './IngredientRow';

const RecipePanelIngredientsLayout = styled.div`
  grid-column: 2/3;
  overflow-y: auto;
  padding: 1rem;
`;

const IngredientList = styled.ul`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
`;

interface RecipePanelIngredientsProps {
  ingredients: IRecipeIngredient[];
}

function RecipePanelIngredients({ ingredients }: RecipePanelIngredientsProps) {
  return (
    <RecipePanelIngredientsLayout>
      <Heading as='h2'>Składniki:</Heading>
      <IngredientList>
        {ingredients.map((ingr) => (
          <IngredientRow ingredient={ingr} />
        ))}
      </IngredientList>
    </RecipePanelIngredientsLayout>
  );
}

export default RecipePanelIngredients;

import styled from 'styled-components';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';
import { IRecipeIngredient } from '../../../interfaces/IIngredient';
import { formatMeasurement } from '../../../utils/helpers';

const OwnedIngredients = styled.span`
  color: green;
  font-weight: 600;
`;

interface IngredientRowProps {
  ingredient: IRecipeIngredient;
}

function IngredientRow({ ingredient }: IngredientRowProps) {
  const ingredientsContext = useIngredientsContext();
  const amount = ingredient.amount;
  const ingredientName = ingredient.ingredient.name;
  const measurement = formatMeasurement(amount, ingredient.measurement);

  console.log(`ingredientsIDS`, ingredientsContext.ingredientsIds);
  console.log(`ingredientsID`, ingredient.ingredient.id);

  return (
    <li>
      {ingredientsContext.ingredientsIds.includes(ingredient.ingredient.id) ? (
        <OwnedIngredients>{ingredientName}</OwnedIngredients>
      ) : (
        ingredientName
      )}{' '}
      - {ingredient.amount} {measurement}
    </li>
  );
}

export default IngredientRow;

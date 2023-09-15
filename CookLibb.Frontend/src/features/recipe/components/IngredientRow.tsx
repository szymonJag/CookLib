import { IRecipeIngredient } from '../../../interfaces/IIngredient';
import { formatMeasurement } from '../../../utils/helpers';

interface IngredientRowProps {
  ingredient: IRecipeIngredient;
}

function IngredientRow({ ingredient }: IngredientRowProps) {
  const amount = ingredient.amount;
  const ingredientName = ingredient.ingredient.name;
  const measurement = formatMeasurement(amount, ingredient.measurement);
  return (
    <li>
      {ingredientName} - {ingredient.amount} {measurement}
    </li>
  );
}

export default IngredientRow;

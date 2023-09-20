import styled from 'styled-components';
import { IIngredient } from '../../../interfaces/IIngredient';
import Checkbox from '../../../ui/Checkbox';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';

const IngredientCheckboxesLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
`;

interface IngredientCheckboxesProps {
  ingredients: IIngredient[];
}

function IngredientCheckboxes({ ingredients }: IngredientCheckboxesProps) {
  const ingredientsContext = useIngredientsContext();

  const handleCheckboxClick = (ingredient: IIngredient) => {
    ingredientsContext.addIngredient(ingredient);
  };

  return (
    <IngredientCheckboxesLayout>
      {ingredients.map((ingr) => (
        <Checkbox
          label={ingr.name}
          key={ingr.id}
          checked={ingredientsContext.ingredientsIds.includes(ingr.id)}
          onChange={() => handleCheckboxClick(ingr)}
        />
      ))}
    </IngredientCheckboxesLayout>
  );
}

export default IngredientCheckboxes;

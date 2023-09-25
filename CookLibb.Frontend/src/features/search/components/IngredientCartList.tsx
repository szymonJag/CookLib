import styled from 'styled-components';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';
import IngredientCartRow from './IngredientCartRow';

const IngredientCartListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function IngredientCartList() {
  const ingredientsContext = useIngredientsContext();
  const ingredients = ingredientsContext.ingredients;

  return (
    <IngredientCartListLayout>
      {ingredients.map((ingr) => (
        <IngredientCartRow ingredient={ingr} key={ingr.id} />
      ))}
    </IngredientCartListLayout>
  );
}

export default IngredientCartList;

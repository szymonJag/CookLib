import styled from 'styled-components';
import Button from '../../../ui/Button';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';
import Heading from '../../../ui/Heading';
import { NavLink } from 'react-router-dom';

const IngredientSearchOperationsLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
`;

interface IngredientSearchOperationsProps {
  onSearchButton: () => void;
  onResetButton: () => void;
}

function IngredientSearchOperations({
  onResetButton,
  onSearchButton,
}: IngredientSearchOperationsProps) {
  const ingredientsContext = useIngredientsContext();

  return (
    <IngredientSearchOperationsLayout>
      <Heading as='h3'>
        {ingredientsContext.ingredients.length > 0 ? (
          <>
            <Button
              size='small'
              disabled={ingredientsContext.ingredientsIds.length === 0}
              onClick={() => onSearchButton()}
            >
              Szukaj
            </Button>{' '}
            <span>
              na podstawie posiadanych produktów (wybrano{' '}
              {ingredientsContext.ingredientsIds.length})
            </span>
          </>
        ) : (
          <>
            <NavLink to='/search'>
              <Button size='small'>Wybierz</Button>
            </NavLink>
            <span> produkty które masz w lodówce</span>
          </>
        )}
      </Heading>
      <Button
        size='small'
        variation='secondary'
        disabled={ingredientsContext.ingredientsIds.length === 0}
        onClick={() => onResetButton()}
      >
        Resetuj
      </Button>
    </IngredientSearchOperationsLayout>
  );
}

export default IngredientSearchOperations;

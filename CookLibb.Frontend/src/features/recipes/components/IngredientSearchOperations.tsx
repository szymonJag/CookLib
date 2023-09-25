import styled from 'styled-components';
import Button from '../../../ui/Button';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';
import Heading from '../../../ui/Heading';

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
        <Button
          size='medium'
          disabled={ingredientsContext.ingredientsIds.length === 0}
          onClick={() => onSearchButton()}
        >
          Szukaj
        </Button>{' '}
        na podstawie posiadanych produktów (wybrano{' '}
        {ingredientsContext.ingredientsIds.length})
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

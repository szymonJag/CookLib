import styled from 'styled-components';
import { IIngredient } from '../../../interfaces/IIngredient';
import { GiCancel } from 'react-icons/gi';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';
import { motion } from 'framer-motion';

const IngredientCartRowLayout = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.2rem 0;

  &:hover {
    transform: scale(1.2);
  }
`;

const DeleteIcon = styled(GiCancel)`
  fill: var(--color-grey-700);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

interface IngredientCartRowProps {
  ingredient: IIngredient;
}

function IngredientCartRow({ ingredient }: IngredientCartRowProps) {
  const ingredientsContext = useIngredientsContext();

  return (
    <IngredientCartRowLayout
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
    >
      <DeleteIcon
        onClick={() => ingredientsContext.deleteIngredient(ingredient.id)}
      />
      {ingredient.name}
    </IngredientCartRowLayout>
  );
}

export default IngredientCartRow;

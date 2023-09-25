import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useIngredientsContext } from '../../../contexts/IngredientsCartContext';
import EmptyProductCartInfo from './EmptyProductCartInfo';
import ProductCartList from './IngredientCartList';
const ProductCartLayout = styled(motion.div)`
  padding: 1rem;
`;

function IngredientCart() {
  const ingredientsContext = useIngredientsContext();

  return (
    <ProductCartLayout
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -100, opacity: 0 }}
    >
      {ingredientsContext.ingredients.length > 0 ? (
        <ProductCartList />
      ) : (
        <EmptyProductCartInfo />
      )}
    </ProductCartLayout>
  );
}

export default IngredientCart;

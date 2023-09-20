import { styled } from 'styled-components';
import { motion } from 'framer-motion';
const ProductCartLayout = styled(motion.div)`
  padding: 1rem;
`;

function ProductCart() {
  return (
    <ProductCartLayout
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -100, opacity: 0 }}
    >
      Aktualnie nie masz żadnych produktów na liście.
      <br />
      Wybierz elementy z listy obok
    </ProductCartLayout>
  );
}

export default ProductCart;

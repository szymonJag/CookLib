import { styled } from 'styled-components';

const ProductCartLayout = styled.div`
  padding: 1rem;
`;

function ProductCart() {
  return (
    <ProductCartLayout>
      Aktualnie nie masz żadnych produktów na liście.
      <br />
      Wybierz elementy z listy obok
    </ProductCartLayout>
  );
}

export default ProductCart;

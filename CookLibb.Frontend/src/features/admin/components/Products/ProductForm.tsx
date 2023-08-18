import { styled } from 'styled-components';
import UpdateProductForm from './UpdateProductForm';
import CreateProductForm from './CreateProductForm';
import { useLocation } from 'react-router-dom';

const ProductFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function ProductForm() {
  const location = useLocation();
  const url = '/admin/edit/product/';

  const isUpdating = location.pathname.startsWith(url);
  return (
    <ProductFormStyle>
      {isUpdating ? <UpdateProductForm /> : <CreateProductForm />}
    </ProductFormStyle>
  );
}

export default ProductForm;

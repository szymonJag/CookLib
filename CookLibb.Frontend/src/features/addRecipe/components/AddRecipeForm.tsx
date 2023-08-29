import { styled } from 'styled-components';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Heading from '../../../ui/Heading';
import AddProductTable from './AddProductTable';
import ProductsCart from './ProductsCart';
import { useState } from 'react';
import { IProduct } from '../../../interfaces/IProduct';
import { IProductMeasuremenet } from '../../../interfaces/IProductMeasurement';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1rem 2rem;
  gap: 4rem;
`;

const RecipeForm = styled(Form)`
  background-color: transparent;
  border: none;
  display: flex;
  gap: 5rem;
`;

const StepText = styled.span`
  font-weight: 500;
`;

const RecipeStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function AddRecipeForm() {
  const [products, setProducts] = useState<IProductMeasuremenet[]>([]);

  function handleAddProduct(product: IProduct) {
    const newProduct: IProductMeasuremenet = {
      product: product,
      amount: 0,
      measurementId: 0,
    };

    setProducts((prev) =>
      products.find((x) => x.product.id === product.id)
        ? [...prev]
        : [...prev, newProduct]
    );
  }

  function handleDeleteProduct(id: number) {
    setProducts((prev) => prev.filter((x) => x.product.id !== id));
  }

  function handleSelectMeasurement(measurementId: number, productId: number) {
    setProducts((prev) =>
      prev.map((x) =>
        x.product.id === productId
          ? { ...x, measurementId: measurementId }
          : { ...x }
      )
    );
    console.log(`measurementId`, measurementId);
    console.log(`productId`, productId);
    console.log(`products`, products);
  }

  return (
    <RecipeForm>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok pierwszy </StepText>- podstawowe informacje
        </Heading>
        <FormSection>
          <FormRow label='Nazwa przepisu' orientation='vertical'>
            <Input type='text' id='name' />
          </FormRow>
          <FormRow label='Czas przygotowania (min)' orientation='vertical'>
            <Input type='number' id='name' min='1' />
          </FormRow>
          <FormRow label='Ilość porcji' orientation='vertical'>
            <Input type='number' id='name' min='1' />
          </FormRow>
        </FormSection>
      </RecipeStep>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok drugi </StepText> - dodaj składniki
        </Heading>
        <FormSection>
          <AddProductTable onAddProduct={handleAddProduct} />
          <ProductsCart
            products={products}
            onDeleteButton={handleDeleteProduct}
            onSelectButton={handleSelectMeasurement}
          />
        </FormSection>
      </RecipeStep>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok trzeci </StepText> - dodaj kroki przygotowania
        </Heading>
        <FormSection>chuj</FormSection>
      </RecipeStep>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok czwarty </StepText> - dodaj tagi
        </Heading>
        <FormSection>chuj</FormSection>
      </RecipeStep>
    </RecipeForm>
  );
}

export default AddRecipeForm;

import { styled } from 'styled-components';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Heading from '../../../ui/Heading';
import AddProductTable from './AddProductTable';
import ProductsCart from './ProductsCart';
import { useState, MouseEvent } from 'react';
import { IProduct } from '../../../interfaces/IProduct';
import { IProductMeasuremenet } from '../../../interfaces/IProductMeasurement';
import Button from '../../../ui/Button';
import TextArea from '../../../ui/TextArea';

interface SectionProps {
  orientation?: 'column' | 'row';
}

const FormSection = styled.div<SectionProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === 'column' ? 'column' : 'row'};
  align-items: center;
  justify-content: space-around;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1rem 2rem;
  gap: 4rem;
`;

FormSection.defaultProps = {
  orientation: 'row',
};

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

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

function AddRecipeForm() {
  const [products, setProducts] = useState<IProductMeasuremenet[]>([]);
  const [textAreas, setTextAreas] = useState<string[]>(['', '', '']);

  const handleAddTextArea = (e: MouseEvent) => {
    e.preventDefault();
    setTextAreas((prevTextAreas) => [...prevTextAreas, '']); // Add an empty text area
  };
  const handleRemoveTextArea = (index: number) => {
    if (textAreas.length > 1)
      setTextAreas(
        (prevTextAreas) => prevTextAreas.filter((_, i) => i !== index) // Remove the text area at the specified index
      );
  };

  const handleClearTextAreas = (e: MouseEvent) => {
    e.preventDefault();
    setTextAreas(['']);
  };

  const handleAddProduct = (product: IProduct) => {
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
    console.log(products);
  };

  function handleDeleteProduct(id: number) {
    setProducts((prev) => prev.filter((x) => x.product.id !== id));
    console.log(products);
  }

  function handleSelectMeasurement(measurementId: number, productId: number) {
    setProducts((prev) =>
      prev.map((x) =>
        x.product.id === productId
          ? { ...x, measurementId: measurementId }
          : { ...x }
      )
    );
    console.log(products);
  }

  const handleValueChange = (value: number, productId: number) => {
    setProducts((prev) =>
      prev.map((x) => {
        console.log(x);
        return x.product.id === productId ? { ...x, amount: value } : { ...x };
      })
    );

    console.log(products);
  };

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
            onValueChange={(value: number, productId: number) =>
              handleValueChange(value, productId)
            }
            onDeleteButton={handleDeleteProduct}
            onSelectButton={handleSelectMeasurement}
          />
        </FormSection>
      </RecipeStep>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok trzeci </StepText> - dodaj kroki przygotowania
        </Heading>
        <Buttons>
          <Button onClick={(e: MouseEvent) => handleAddTextArea(e)}>
            Dodaj krok
          </Button>
          <Button
            variation={'danger'}
            onClick={(e: MouseEvent) => handleClearTextAreas(e)}
          >
            Wyczyść
          </Button>
        </Buttons>
        <FormSection orientation='column'>
          {textAreas.map((text, index) => (
            <TextArea
              key={index}
              value={text}
              onChange={(newValue) => {
                const newTextAreas = [...textAreas];
                newTextAreas[index] = newValue;
                setTextAreas(newTextAreas);
              }}
              index={index}
              handleRemove={handleRemoveTextArea}
            />
          ))}
          {/* Button to add a new text area */}
        </FormSection>
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

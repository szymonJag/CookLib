import { styled } from 'styled-components';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { IngredientTypes } from '../../../utils/constants';
import { ButtonForm } from '../../../ui/Button';
import { useForm, FieldErrors, SubmitHandler } from 'react-hook-form';
import {
  IAddIngredientRequest,
  IUpdateIngredientRequest,
} from '../../../interfaces/IIngredient';
import { useCreateProduct } from '../hooks/useCreateIngredient';
import { useUpdateProduct } from '../hooks/useUpdateIngredient';
import Select, { StyledSelect } from '../../../ui/Select';
import { useEffect } from 'react';

const ProductFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const InputSelect = styled(Select)`
  width: auto;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled(ButtonForm)`
  margin-left: auto;
`;

type FormValues = IAddIngredientRequest;

interface IProductFormProps {
  product: IUpdateIngredientRequest | undefined;
  handleBackClick: () => void;
  isEditable: boolean;
}

function ProductForm({
  product = undefined,
  handleBackClick,
  isEditable,
}: IProductFormProps) {
  const { isCreating, createProductMt } = useCreateProduct();
  const { isUpdating, updateProductMt } = useUpdateProduct();

  // const isEditing = Boolean(product && product.id);
  const { register, handleSubmit, formState, setValue, reset } =
    useForm<FormValues>({
      defaultValues: {
        name: product?.name || '',
        kcal: product?.kcal || 0,
        type: product?.type || 0,
      },
    });
  const { errors } = formState;

  const isDisabled = isCreating || isUpdating;

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('kcal', product.kcal);
      setValue('type', product.type);
    }
  }, [product, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const productData: IAddIngredientRequest = {
      name: data.name,
      kcal: data.kcal,
      type: Number(data.type),
    };

    if (!isEditable) {
      console.log(productData);
      createProductMt(productData);
      handleBackClick();
      reset();
    }

    if (isEditable) {
      const editProduct: IUpdateIngredientRequest = {
        id: product!.id, // Assuming product is defined when editing
        ...productData,
      };
      updateProductMt({ product: editProduct, id: product!.id });
      reset();

      const nameInput = document.getElementById('name') as HTMLInputElement;
      if (nameInput) {
        nameInput.focus();
      }
    }
  };

  function onBack() {
    reset();
    handleBackClick();
  }

  function onError(errors: FieldErrors) {
    console.log('Error:', errors);
  }
  return (
    <ProductFormStyle>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow
          orientation='vertical'
          label='Nazwa produktu'
          error={errors?.name?.message?.toString()}
        >
          <Input
            type='text'
            id='name'
            disabled={isDisabled}
            {...register('name', { required: 'To pole jest wymagane' })}
          />
        </FormRow>
        <FormRow
          orientation='vertical'
          label='Ilość kalorii (na 100 g/ml)'
          error={errors?.kcal?.message?.toString()}
        >
          <Input
            type='number'
            id='kcal'
            disabled={isDisabled}
            {...register('kcal', { required: 'To pole jest wymagane' })}
            min={0}
            max={9999}
          />
        </FormRow>
        <FormRow orientation='vertical' label='Typ produktu'>
          <StyledSelect
            {...register('type', { required: 'Select an ingredient type' })}
          >
            {IngredientTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        <Buttons>
          {product && (
            <ButtonForm variation='secondary' onClick={onBack} type='button'>
              Wróć
            </ButtonForm>
          )}

          <AddButton size='medium' disabled={isCreating} type='submit'>
            {isEditable ? 'Edytuj' : 'Dodaj'} produkt
          </AddButton>
        </Buttons>
      </Form>
    </ProductFormStyle>
  );
}

export default ProductForm;

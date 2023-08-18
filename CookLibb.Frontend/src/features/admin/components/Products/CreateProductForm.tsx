import { styled } from 'styled-components';
import Form from '../../../../ui/Form';
import FormRow from '../../../../ui/FormRow';
import Input from '../../../../ui/Input';
import Select from '../../../../ui/Select';
import { IngredientTypes } from '../../../../utils/constants';
import { ButtonForm } from '../../../../ui/Button';
import { useForm, FieldErrors, SubmitHandler } from 'react-hook-form';
import { IAddProductRequest } from '../../../../interfaces/IProduct';
import { useCreateProduct } from '../../hooks/Products/useCreateProduct';

export const InputSelect = styled(Select)`
  width: auto;
`;

type FormValues = IAddProductRequest;

function CreateProductForm() {
  const { register, handleSubmit, formState, setValue } = useForm<FormValues>();
  const { isCreating, createProduct } = useCreateProduct();
  const { errors } = formState;

  const isWorking = false;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Use the SubmitHandler type
    const product: IAddProductRequest = {
      name: data.name,
      kcal: data.kcal,
      type: data.type,
    };
    createProduct(product);
    // reset();
  };

  function onError(errors: FieldErrors) {
    console.log('error chuj');
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        orientation='vertical'
        label='Nazwa produktu'
        error={errors?.name?.message?.toString()}
      >
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'To pole jest wymagane' })}
        />
      </FormRow>
      <FormRow
        orientation='vertical'
        label='Ilość kalorii'
        error={errors?.kcal?.message?.toString()}
      >
        <Input
          type='number'
          id='kcal'
          disabled={isWorking}
          {...register('kcal', { required: 'To pole jest wymagane' })}
        />
      </FormRow>
      <FormRow orientation='vertical' label='Typ produktu'>
        <InputSelect
          options={[{ id: 0, name: 'Typ produktu' }, ...IngredientTypes]}
          {...register('type', { required: 'Wybierz typ produktu' })}
          onChange={(e) => {
            setValue('type', Number(e.target.value));
          }}
        />
      </FormRow>

      <ButtonForm size='medium' disabled={isCreating}>
        Dodaj produkt
      </ButtonForm>
    </Form>
  );
}

export default CreateProductForm;

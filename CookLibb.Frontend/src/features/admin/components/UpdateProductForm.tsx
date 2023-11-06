import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import { ButtonForm } from '../../../ui/Button';
import { IngredientTypes } from '../../../utils/constants';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { InputSelect } from './IngredientForm';

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function UpdateProductForm() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.productId);

  return (
    <Form>
      <FormRow orientation='vertical' label='Nazwa produktu'>
        <Input />
      </FormRow>
      <FormRow orientation='vertical' label='Ilość kalorii'>
        <Input type='number' />
      </FormRow>
      <FormRow orientation='vertical' label='Typ produktu'>
        <InputSelect options={IngredientTypes} />
      </FormRow>
      <Buttons>
        <ButtonForm size='medium' onClick={() => navigate('/admin')}>
          Wróć
        </ButtonForm>
        <ButtonForm size='medium'>Edytuj</ButtonForm>
      </Buttons>
    </Form>
  );
}

export default UpdateProductForm;

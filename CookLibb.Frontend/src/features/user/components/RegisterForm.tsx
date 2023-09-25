import styled from 'styled-components';
import { ButtonForm } from '../../../ui/Button';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';

const RegisterFormStyle = styled(Form)`
  border: none;
  background-color: var(--color-grey-50);
`;

function RegisterForm() {
  return (
    <RegisterFormStyle>
      <FormRow label='Nazwa użytkownika' orientation='vertical'>
        <Input type='text' />
      </FormRow>
      <FormRow label='Hasło' orientation='vertical'>
        <Input type='password' />
      </FormRow>
      <FormRow label='Powtórz hasło' orientation='vertical'>
        <Input type='password' />
      </FormRow>
      <ButtonForm>Załóż konto</ButtonForm>
    </RegisterFormStyle>
  );
}

export default RegisterForm;

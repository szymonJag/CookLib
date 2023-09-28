import styled from 'styled-components';
import Button, { ButtonForm } from '../../../ui/Button';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Form from '../../../ui/Form';
import Heading from '../../../ui/Heading';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import {
  AuthenticationResponseType,
  IRequestAuthenticateUser,
} from '../../../interfaces/IUser';
import { ChangeEvent, useState } from 'react';
import { useRegisterUser } from '../hooks/useRegisterUser';
import { useLoginUser } from '../hooks/useLoginUser';
import Spinner from '../../../ui/Spinner';

const AuthenticationFormLayout = styled.div`
  min-height: 50vh;
  max-width: 30vw;
`;

const RegisterFormStyle = styled(Form)`
  border: none;
  background-color: var(--color-grey-50);
`;

const ErrorSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Error = styled.p`
  font-size: 1.4rem;
  color: var(--color-red-700);
  font-weight: 600;
`;

interface AuthenticationFormProps {
  handleButtonClick: () => void;
  formMode: 'login' | 'register';
}

type FormValues = IRequestAuthenticateUser;

function AuthenticationForm({
  handleButtonClick,
  formMode = 'register',
}: AuthenticationFormProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { isCreating: isRegistering, registerUserMt } = useRegisterUser();
  const { isCreating: isLogging, loginUserMt } = useLoginUser();
  const [responseError, setResponseError] = useState<string>('');
  const [response, setResponse] =
    useState<AuthenticationResponseType>(undefined);

  const isCreating = isRegistering && isLogging;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setResponseError('');
    if (confirmPassword !== password)
      setResponseError('Hasła powinny być takie same!');
    if (confirmPassword === password && formMode === 'register') {
      registerUserMt(data, {
        onSuccess: (responseData) => {
          if (responseData.error) {
            console.log(`responseData chuj`, responseData.error);
            setResponseError(responseData.error);
          } else {
            setResponse(responseData.id);
          }
          console.log(`responseData`, response);
          console.log(`responseDataError`, responseError);
          // reset();
          // setConfirmPassword('');
          // setPassword('');
        },
      });
    }

    if (formMode === 'login') {
      loginUserMt(data, {
        onSuccess: (responseData) => {
          console.log(responseData);
        },
      });
    }
  };

  console.log(response);

  const onError = (errors: FieldErrors) => {
    console.log('Error:', errors);
  };

  if (isCreating) return <Spinner />;

  return (
    <AuthenticationFormLayout>
      <Heading as='h3'>
        {formMode === 'login' ? 'Logowanie' : 'Rejestracja'}
      </Heading>
      <RegisterFormStyle onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label='Nazwa użytkownika' orientation='vertical'>
          <Input
            type='text'
            id='username'
            {...register('username', { required: 'To pole jest wymagane' })}
          />
        </FormRow>
        <FormRow label='Hasło' orientation='vertical'>
          <Input
            type='password'
            value={password}
            {...register('password', { required: 'To pole jest wymagane' })}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </FormRow>
        <FormRow
          label='Powtórz hasło'
          orientation='vertical'
          isVisible={formMode === 'register'}
        >
          <Input
            type='password'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
        </FormRow>
        <ButtonForm type='submit' disabled={isCreating}>
          {formMode === 'register' ? 'Załóż konto' : 'Zaloguj się'}
        </ButtonForm>
      </RegisterFormStyle>
      <p>
        {formMode === 'register'
          ? 'Masz już konto? Możesz się zalogować klikając'
          : 'Nie masz konta? Możesz się zarejestrować klikając'}{' '}
        <Button
          size='small'
          variation='secondary'
          onClick={() => handleButtonClick()}
        >
          tutaj
        </Button>
      </p>
      {responseError.length > 0 && (
        <ErrorSection>
          <Error>{responseError}</Error>
        </ErrorSection>
      )}
    </AuthenticationFormLayout>
  );
}

export default AuthenticationForm;

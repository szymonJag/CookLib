import styled from 'styled-components';
import Button, { ButtonForm } from '../../../ui/Button';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Form from '../../../ui/Form';
import Heading from '../../../ui/Heading';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { IRequestAuthenticateUser } from '../../../interfaces/IUser';
import { ChangeEvent, useState } from 'react';
import { useRegisterUser } from '../hooks/useRegisterUser';
import { useLoginUser } from '../hooks/useLoginUser';
import Spinner from '../../../ui/Spinner';
import { useUserContext } from '../../../contexts/UserContext';

const AuthenticationFormLayout = styled.div`
  min-height: 50vh;
  width: 30vw;
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

const AuthenticationButton = styled(Button)``;

const ChangeFormInfo = styled.div`
  display: flex;
  justify-content: flex-end;
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
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { isCreating: isRegistering, registerUserMt } = useRegisterUser();
  const { isCreating: isLogging, loginUserMt } = useLoginUser();
  const [responseError, setResponseError] = useState<string>('');

  const userContext = useUserContext();

  const isCreating = isRegistering && isLogging;

  const resetForm = () => {
    reset();
    setConfirmPassword('');
    setPassword('');
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setResponseError('');
    if (formMode == 'register' && confirmPassword !== password)
      setResponseError('Hasła powinny być takie same!');

    if (confirmPassword === password && formMode === 'register') {
      registerUserMt(data, {
        onSuccess: (responseData) => {
          if (responseData.error) setResponseError(responseData.error);
          resetForm();
        },
      });
    }

    if (formMode === 'login') {
      loginUserMt(data, {
        onSuccess: (responseData) => {
          if (responseData.error) {
            setResponseError(responseData.error);
          } else {
            // const authenticatedUser: IUser = {
            //   username: responseData.username,
            //   mail: responseData.mail,
            //   role: responseData.role,
            //   avatarURL: responseData
            // };
            userContext.login(responseData);
            userContext.setAuthToken(data.username, data.password);
            resetForm();
          }
        },
      });
    }
  };

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
      <ChangeFormInfo>
        {formMode === 'register'
          ? 'Masz już konto? Możesz się zalogować klikając'
          : 'Nie masz konta? Zarejestruj się klikając'}{' '}
        <AuthenticationButton
          size='small'
          variation='secondary'
          onClick={() => handleButtonClick()}
        >
          tutaj
        </AuthenticationButton>
      </ChangeFormInfo>
      {responseError.length > 0 && (
        <ErrorSection>
          <Error>{responseError}</Error>
        </ErrorSection>
      )}
    </AuthenticationFormLayout>
  );
}

export default AuthenticationForm;

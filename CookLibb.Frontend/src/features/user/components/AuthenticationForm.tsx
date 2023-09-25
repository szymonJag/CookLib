import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import Button from '../../../ui/Button';
import LoginForm from './LoginForm';
import { useState } from 'react';

const AuthenticationFormLayot = styled.div``;

function AuthenticationForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthenticationFormLayot>
      {isLogin ? <RegisterForm /> : <LoginForm />}
      <p>
        Masz już konto? Możesz się zalogować klikając
        <Button
          size='small'
          variation='secondary'
          onClick={() => setIsLogin((prev) => !prev)}
        >
          tutaj
        </Button>
      </p>
    </AuthenticationFormLayot>
  );
}

export default AuthenticationForm;

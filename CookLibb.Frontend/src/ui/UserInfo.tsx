import React, { useState } from 'react';
import styled from 'styled-components';
import Button, { AnimatedButton } from './Button';
import Modal from './Modal';
import AuthenticationForm from '../features/user/components/AuthenticationForm';
import { useUserContext } from '../contexts/UserContext';
import { Avatar } from './Avatar';

const InfoLayout = styled.div`
  margin: 1rem 0;
  text-align: center;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
`;

function UserInfo() {
  const [formMode, setFormMode] = useState<'register' | 'login'>('login');
  const userContext = useUserContext();
  const toggleFormMode = () => {
    setFormMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <InfoLayout>
      {userContext.user !== null ? (
        <>
          <span>Cześć, {userContext.user.username}!</span>
          <Avatar src={userContext.user?.avatarURL} alt='avatar' />
        </>
      ) : (
        <span>Aktualnie nie jesteś zalogowany</span>
      )}

      {userContext.user !== null ? (
        <Button size='small' onClick={() => userContext.logout()}>
          Wyloguj
        </Button>
      ) : (
        <Modal>
          <Modal.Open opens='login-form'>
            <AnimatedButton size='small' onClick={toggleFormMode}>
              Zaloguj
            </AnimatedButton>
          </Modal.Open>
          <Modal.Window name='login-form'>
            <AuthenticationForm
              handleButtonClick={toggleFormMode}
              formMode={formMode}
            />
          </Modal.Window>
        </Modal>
      )}
    </InfoLayout>
  );
}

export default UserInfo;

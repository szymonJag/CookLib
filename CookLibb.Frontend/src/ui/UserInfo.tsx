import { styled } from 'styled-components';
import { AnimatedButton } from './Button';
import Modal from './Modal';
import AuthenticationForm from '../features/user/components/AuthenticationForm';

const InfoLayout = styled.div`
  margin: 1rem 0;
  text-align: center;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
`;

function UserInfo() {
  return (
    <InfoLayout>
      <span>Aktualnie nie jesteś zalogowany</span>
      <Modal>
        <Modal.Open opens='login-form'>
          <AnimatedButton size='small'>Zaloguj</AnimatedButton>
        </Modal.Open>
        <Modal.Window name='login-form'>
          <AuthenticationForm />
        </Modal.Window>
      </Modal>
    </InfoLayout>
  );
}

export default UserInfo;

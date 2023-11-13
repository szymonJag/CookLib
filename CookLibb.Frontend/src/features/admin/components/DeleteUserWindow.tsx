import styled from 'styled-components';
import { IUser } from '../../../interfaces/IUser';
import Button from '../../../ui/Button';
import Buttons from '../../../ui/Buttons';
import Heading from '../../../ui/Heading';
import { useDeleteUserById } from '../hooks/useDeleteUserById';

const ModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
`;

interface DeleteUseWindowProps {
  onCloseModal?: () => void;
  user: IUser;
}

function DeleteUserWindow({ onCloseModal, user }: DeleteUseWindowProps) {
  const { isDeleting, deleteUserByIdMt } = useDeleteUserById();

  const handleYesClick = () => {
    deleteUserByIdMt(user.id);

    !isDeleting && onCloseModal!();
  };

  const handleNoClick = () => {
    onCloseModal!();
  };

  return (
    <ModalLayout>
      <Heading as='h3'>
        Czy na pewno chcesz usunąć użytkownika {user.username}?
      </Heading>
      <Buttons>
        <Button onClick={handleNoClick} variation='secondary'>
          Nie
        </Button>
        <Button
          variation='danger'
          onClick={handleYesClick}
          disabled={isDeleting}
        >
          Tak
        </Button>
      </Buttons>
    </ModalLayout>
  );
}

export default DeleteUserWindow;

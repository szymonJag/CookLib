import { IUser } from '../../../interfaces/IUser';
import Button from '../../../ui/Button';
import Modal from '../../../ui/Modal';
import DeleteUserWindow from './DeleteUserWindow';

interface DeleteUserModalProps {
  user: IUser;
}

function DeleteUserModal({ user }: DeleteUserModalProps) {
  return (
    <Modal>
      <Modal.Open opens='delete-user'>
        <Button size='small' variation='danger'>
          Usuń
        </Button>
      </Modal.Open>
      <Modal.Window name='delete-user'>
        <DeleteUserWindow user={user} />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteUserModal;

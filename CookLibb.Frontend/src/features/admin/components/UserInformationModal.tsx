import { IUser } from '../../../interfaces/IUser';
import Modal from '../../../ui/Modal';
import { ReactNode } from 'react';
import UserInformationWindow from '../../../ui/UserInformationWindow';

interface UserInformationModalProps {
  user: IUser | null;
  children: ReactNode;
}

export default function UserInformationModal({
  user,
  children,
}: UserInformationModalProps) {
  console.log(user);

  if (user === null) {
    return;
  }

  return (
    <Modal>
      <Modal.Open opens='show-user-information'>{children}</Modal.Open>
      <Modal.Window name='show-user-information' header='Użytkownik'>
        <UserInformationWindow user={user} />
      </Modal.Window>
    </Modal>
  );
}

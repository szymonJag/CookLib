import { IUser } from '../../../interfaces/IUser';
import Table from '../../../ui/Table';
import { UserRoles } from '../../../utils/constants';
import Button from '../../../ui/Button';
import { useChangeUserRole } from '../hooks/useChangeUserRole';
import DeleteUserModal from './DeleteUserModal';
import Buttons from '../../../ui/Buttons';

interface UserRowProps {
  user: IUser;
}

function UserRow({ user }: UserRowProps) {
  const { changeUserRoleMt } = useChangeUserRole();
  const role = UserRoles[user.role];
  return (
    <Table.Row>
      <span>{user.id}</span>
      <span>{user.username}</span>
      <span>{user.mail}</span>
      <span>{role}</span>
      <Buttons>
        <Button size='small' variation='secondary'>
          Wyświetl
        </Button>
        <Button
          size='small'
          variation='primary'
          onClick={() => changeUserRoleMt(user.id)}
        >
          Zmień rolę
        </Button>
        <DeleteUserModal user={user} />
      </Buttons>
    </Table.Row>
  );
}

export default UserRow;

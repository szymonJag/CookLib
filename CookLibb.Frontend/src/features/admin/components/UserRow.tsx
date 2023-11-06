import styled from 'styled-components';
import { IUser } from '../../../interfaces/IUser';
import Table from '../../../ui/Table';
import { UserRoles } from '../../../utils/constants';
import Button from '../../../ui/Button';

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

interface UserRowProps {
  user: IUser;
}

function UserRow({ user }: UserRowProps) {
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
        <Button size='small' variation='primary'>
          Zmień rolę
        </Button>
        <Button size='small' variation='danger'>
          Usuń
        </Button>
      </Buttons>
    </Table.Row>
  );
}

export default UserRow;

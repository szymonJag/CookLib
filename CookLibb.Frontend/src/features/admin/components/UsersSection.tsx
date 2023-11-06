import styled from 'styled-components';
import Table from '../../../ui/Table';
import { IUser } from '../../../interfaces/IUser';
import UserRow from './UserRow';
import { useGetUsers } from '../hooks/useGetUsers';
import Spinner from '../../../ui/Spinner';

const TableHeaderText = styled.span``;

function UsersSection() {
  const { users, isLoading } = useGetUsers();

  return (
    <Table columns='.2fr 1fr 1fr 1fr 1.5fr' height='60rem'>
      <Table.Header>
        <TableHeaderText>Id</TableHeaderText>
        <TableHeaderText>Nazwa</TableHeaderText>
        <TableHeaderText>Mail</TableHeaderText>
        <TableHeaderText>Rola</TableHeaderText>
        <TableHeaderText>Akcja</TableHeaderText>
      </Table.Header>
      {isLoading && <Spinner />}
      <Table.Body
        data={users}
        error='Brak rekordów do wyświetlenia'
        render={(user: IUser) => <UserRow user={user} />}
      />
    </Table>
  );
}

export default UsersSection;

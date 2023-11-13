import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Table from '../../../ui/Table';
import { IUser } from '../../../interfaces/IUser';
import UserRow from './UserRow';
import { useGetUsers } from '../hooks/useGetUsers';
import Spinner from '../../../ui/Spinner';
import Input from '../../../ui/Input';

const TableHeaderText = styled.span``;
function UsersSection() {
  const [filterText, setFilterText] = useState('');
  const { users: originalUsers, isLoading } = useGetUsers();
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const originalUsersRef = useRef<IUser[]>([]);

  useEffect(() => {
    originalUsersRef.current = originalUsers;
    setFilteredUsers(originalUsers);
  }, [originalUsers]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setFilterText(searchTerm);

    const filteredList = originalUsersRef.current.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredList);
  };

  return (
    <Table columns='.2fr 1fr 1fr 1fr 1.5fr' height='50rem'>
      <Table.Header>
        <TableHeaderText>Id</TableHeaderText>
        <TableHeaderText>
          <Input
            type='text'
            value={filterText}
            onChange={handleInputChange}
            placeholder='Filtruj nazwę'
          />
        </TableHeaderText>
        <TableHeaderText>Mail</TableHeaderText>
        <TableHeaderText>Rola</TableHeaderText>
        <TableHeaderText>Akcja</TableHeaderText>
      </Table.Header>
      {isLoading && <Spinner />}
      <Table.Body
        data={filteredUsers}
        error='Brak rekordów do wyświetlenia'
        render={(user: IUser) => <UserRow user={user} />}
      />
    </Table>
  );
}

export default UsersSection;

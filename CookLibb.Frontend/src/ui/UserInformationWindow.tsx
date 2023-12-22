import React from 'react';
import Button from './Button';
import { IUser } from '../interfaces/IUser';
import styled from 'styled-components';
import { Avatar } from './Avatar';
import Heading from './Heading';
import { UserRoles } from '../utils/constants';
import { calculateNumberOfDays } from '../utils/helpers';

const UserInformationWindowLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const UserInformationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface UserInformationWindowProps {
  user: IUser;
  onCloseModal?: () => void;
}

export default function UserInformationWindow({
  user,
  onCloseModal,
}: UserInformationWindowProps) {
  console.log(user);

  const handleNoClick = () => {
    onCloseModal!();
  };

  return (
    <UserInformationWindowLayout>
      <UserInformationRow>
        <Avatar src={user.avatarURL} />
        <Heading as='h2'>{user.username}</Heading>
      </UserInformationRow>
      <UserInformationRow>
        <Heading as='h3'>Mail:</Heading>
        <Heading as='h2'>{user.mail}</Heading>
      </UserInformationRow>
      <UserInformationRow>
        <Heading as='h3'>Rola użytkownika:</Heading>
        <Heading as='h2'>{UserRoles[user.role]}</Heading>
      </UserInformationRow>
      <UserInformationRow>
        <Heading as='h3'>Konto utworzono:</Heading>
        <Heading as='h2'>{user.creationDate.toLocaleString()}</Heading>
      </UserInformationRow>
      <UserInformationRow>
        <Heading as='h3'>Ilość dni z nami:</Heading>
        <Heading as='h2'>
          {calculateNumberOfDays(user.creationDate.toString())}
        </Heading>
      </UserInformationRow>
      <Button onClick={handleNoClick}>Wróć</Button>
    </UserInformationWindowLayout>
  );
}

import styled from 'styled-components';
import { useUserContext } from '../../../contexts/UserContext';
import { UserSectionHeading } from './UserSectionHeading';
import UserBasicInformationRow from './UserBasicInformationRow';

const UserBasicInformationLayout = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function UserBasicInformation() {
  const userContext = useUserContext();
  const user = userContext.user;

  return (
    <UserBasicInformationLayout>
      <UserSectionHeading as='h3'>Informacje o koncie</UserSectionHeading>
      <UserBasicInformationRow data={user!.username}>
        Nazwa użytkownika:
      </UserBasicInformationRow>
      <UserBasicInformationRow data={user!.mail}>Mail</UserBasicInformationRow>
      <UserBasicInformationRow
        data={user!.creationDate.toLocaleDateString()}
        showEditButton={false}
      >
        Data rejestracji:
      </UserBasicInformationRow>
      <UserBasicInformationRow
        data={user!.role === 1 ? 'Administrator' : 'Użytkownik'}
        showEditButton={false}
      >
        Rola:
      </UserBasicInformationRow>
      <UserBasicInformationRow buttonVariation='danger' buttonText='Usuń'>
        Usuń konto
      </UserBasicInformationRow>
    </UserBasicInformationLayout>
  );
}

export default UserBasicInformation;

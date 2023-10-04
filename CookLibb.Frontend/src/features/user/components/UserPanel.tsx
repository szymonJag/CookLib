import styled from 'styled-components';
import { PageSection } from '../../../ui/PageSection';
import Heading from '../../../ui/Heading';
import UserInformation from './UserInformation';

const UserPanelLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const UserPanelStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function UserPanel() {
  return (
    <UserPanelLayout>
      <UserPanelStep>
        <Heading as='h2'>Informacje</Heading>
        <PageSection>
          <UserInformation />
        </PageSection>
      </UserPanelStep>
      <UserPanelStep>
        <Heading as='h2'>Dodane przepisy</Heading>
        <PageSection>chuj</PageSection>
      </UserPanelStep>
      <UserPanelStep>
        <Heading as='h2'>Ulubione przepisy</Heading>
        <PageSection>chuj</PageSection>
      </UserPanelStep>
    </UserPanelLayout>
  );
}

export default UserPanel;

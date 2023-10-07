import styled from 'styled-components';
import UserAvatarUpload from './AvatarUpload';
import UserBasicInformation from './UserBasicInformation';

const UserInformationLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
`;

function UserInformation() {
  return (
    <UserInformationLayout>
      <UserAvatarUpload />
      <UserBasicInformation />
    </UserInformationLayout>
  );
}

export default UserInformation;

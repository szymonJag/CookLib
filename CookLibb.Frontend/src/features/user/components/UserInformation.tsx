import styled from 'styled-components';
import UserAvatarUpload from './AvatarUpload';

const UserInformationLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function UserInformation() {
  return (
    <UserInformationLayout>
      <UserAvatarUpload />
    </UserInformationLayout>
  );
}

export default UserInformation;

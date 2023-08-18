import { styled } from 'styled-components';
import { AnimatedButton } from './Button';

const InfoLayout = styled.div`
  margin: 1rem 0;
  text-align: center;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
`;

function UserInfo() {
  return (
    <InfoLayout>
      <span>Aktualnie nie jesteś zalogowany</span>
      <AnimatedButton size='small'>Zaloguj</AnimatedButton>
    </InfoLayout>
  );
}

export default UserInfo;

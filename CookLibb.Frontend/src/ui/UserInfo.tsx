import { styled } from 'styled-components';
import Button from './Button';

const InfoLayout = styled.div`
  margin: 2rem 0;
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
      <Button size='small'>Zaloguj</Button>
    </InfoLayout>
  );
}

export default UserInfo;

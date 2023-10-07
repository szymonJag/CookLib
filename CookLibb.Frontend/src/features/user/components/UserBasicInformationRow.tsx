import styled from 'styled-components';
import Button from '../../../ui/Button';

const UserBasicInformationRowLayout = styled.div`
  display: flex;
  align-self: center;
  gap: 1rem;
  width: 40rem;
`;

const DataText = styled.span`
  font-weight: 500;
  margin-right: auto;
`;

interface UserBasicInformationRowProps {
  handleButtonClick?: () => void;
  data?: string;
  children?: React.ReactNode;
  showEditButton?: boolean;
  buttonVariation?: 'secondary' | 'danger';
  buttonText?: string;
}

function UserBasicInformationRow({
  handleButtonClick,
  data,
  children,
  showEditButton = true,
  buttonVariation = 'secondary',
  buttonText = 'Edytuj',
}: UserBasicInformationRowProps) {
  return (
    <UserBasicInformationRowLayout>
      {children}
      <DataText>{data}</DataText>
      {showEditButton && (
        <Button
          size='small'
          onClick={handleButtonClick}
          variation={buttonVariation}
        >
          {buttonText}
        </Button>
      )}
    </UserBasicInformationRowLayout>
  );
}

export default UserBasicInformationRow;

import { styled } from 'styled-components';
import { IIngredient } from '../interfaces/IIngredient';
import Heading from './Heading';
import Button from './Button';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
interface ConfirmDeleteProps {
  ingredient: IIngredient;
  disabled?: boolean;
  onConfirm?: () => void;
}

function ConfirmDelete({
  onConfirm,
  disabled,
  ingredient,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <Heading as='h3'>Delete {ingredient.name}</Heading>
      <p>
        Czy na pewno chcesz usunąć {ingredient.name} permamentnie? Ta czynność
        będzie nieodwracalna
      </p>

      <div>
        <Button variation='danger' onClick={onConfirm} disabled={disabled}>
          Usuń
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}
export default ConfirmDelete;

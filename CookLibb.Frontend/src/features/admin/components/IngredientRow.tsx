import { styled } from 'styled-components';
import { IIngredient } from '../../../interfaces/IIngredient';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import Modal from '../../../ui/Modal';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import { useDeleteIngredient } from '../hooks/useDeleteIngredient';

interface IngredientRowProps {
  ingredient: IIngredient;
  onEditClick: (produict: IIngredient) => void;
}

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

function IngredientRow({ ingredient, onEditClick }: IngredientRowProps) {
  const { isDeleting, deleteIngredient } = useDeleteIngredient();
  const { name, kcal, type, id } = ingredient;

  return (
    <Table.Row>
      <span>{name}</span>
      <span>{kcal}</span>
      <span>{type?.name}</span>
      <div>
        <Buttons>
          <Button size='small' onClick={() => onEditClick(ingredient)}>
            Edytuj
          </Button>
          <Modal>
            <Modal.Open opens='delete'>
              <Button size='small' variation='danger'>
                Usuń
              </Button>
            </Modal.Open>
            <Modal.Window name='delete'>
              <ConfirmDelete
                ingredient={ingredient}
                onConfirm={() => deleteIngredient(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Buttons>
      </div>
    </Table.Row>
  );
}

export default IngredientRow;

import { styled } from 'styled-components';
import { IProduct } from '../../../../interfaces/IProduct';
import Table from '../../../../ui/Table';
import Button from '../../../../ui/Button';
import Modal from '../../../../ui/Modal';
import ConfirmDelete from '../../../../ui/ConfirmDelete';
import { Link } from 'react-router-dom';
import { useDeleteProduct } from '../../hooks/Products/useDeleteProduct';

interface ProductRowProps {
  product: IProduct;
}

const Item = styled.div``;
const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

function ProductRow({ product }: ProductRowProps) {
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { name, kcal, type, id } = product;

  return (
    <Table.Row>
      <Item>{name}</Item>
      <Item>{kcal}</Item>
      <Item>{type.name}</Item>
      <Item>
        <Buttons>
          <Link to={`/admin/edit/product/${id}`}>
            <Button size='small'>Edytuj</Button>
          </Link>
          <Modal>
            <Modal.Open opens='delete'>
              <Button size='small' variation='danger'>
                Usuń
              </Button>
            </Modal.Open>
            <Modal.Window name='delete'>
              <ConfirmDelete
                product={product}
                onConfirm={() => deleteProduct(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Buttons>
      </Item>
    </Table.Row>
  );
}

export default ProductRow;

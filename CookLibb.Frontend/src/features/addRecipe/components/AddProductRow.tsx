// import { styled } from 'styled-components';
import { styled } from 'styled-components';
import Button from '../../../ui/Button';
import Table from '../../../ui/Table';
import { MouseEvent } from 'react';
import { IIngredient } from '../../../interfaces/IIngredient';

const Btn = styled(Button)`
  width: max-content;
  margin-left: auto;
`;

interface AddProductRowProps {
  product: IIngredient;
  onAddProduct: (product: IIngredient) => void;
}

function AddProductRow({ product, onAddProduct }: AddProductRowProps) {
  return (
    <Table.Row>
      <span>{product.name || ''}</span>
      <span>{product.type?.name || ''}</span>
      <Btn
        size='small'
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onAddProduct(product);
        }}
      >
        Dodaj
      </Btn>
    </Table.Row>
  );
}

export default AddProductRow;

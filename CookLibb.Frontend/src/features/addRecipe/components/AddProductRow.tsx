// import { styled } from 'styled-components';
import { styled } from 'styled-components';
import Button from '../../../ui/Button';
import Table from '../../../ui/Table';
import { MouseEvent } from 'react';
import { IProduct } from '../../../interfaces/IProduct';

const Btn = styled(Button)`
  width: max-content;
  margin-left: auto;
`;

interface AddProductRowProps {
  product: IProduct;
  onAddProduct: (product: IProduct) => void;
}

function AddProductRow({ product, onAddProduct }: AddProductRowProps) {
  return (
    <Table.Row>
      <span>{product.name}</span>
      <span>{product.type.name}</span>
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

// interface ProductCartRowProps {
//   product: IProduct;
// }

// function ProductCartRow({ product }: ProductCartRowProps) {
//   const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
//     const typeId: number = Number(e.target.value);
//     console.log(typeId);
//   };

//   return;
// }

// export default ProductCartRow;

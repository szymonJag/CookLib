import Select from '../../../ui/Select';
import Table from '../../../ui/Table';
import { MeasurementTypes } from '../../../utils/constants';
import { ChangeEvent, MouseEvent } from 'react';
import AmountInput from './AmountInput';
// import Button from '../../../ui/Button';
import { styled } from 'styled-components';
import { IIngredientMeasuremenet } from '../../../interfaces/IIngredientMeasurement';
import { MdDeleteForever } from 'react-icons/md';

// const DeleteButton = styled(Button)`
//   margin-right: 1rem;
//   width: min-content;
// `;

const DeleteIcon = styled(MdDeleteForever)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  transition: 0.2s all;
  fill: var(--color-red-700);

  &:hover {
    transform: scale(120%);
    fill: var(--color-red-800);
  }
`;

interface ProductCartRowProps {
  product: IIngredientMeasuremenet;
  onDeleteButton: (productId: number) => void;
  onSelectButton: (measurementId: number, productId: number) => void;
  onValueChange: (value: number) => void;
}

function ProductCartRow({
  product,
  onDeleteButton,
  onSelectButton,
  onValueChange,
}: ProductCartRowProps) {
  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeId: number = Number(e.target.value);
    onSelectButton(typeId, product.product.id);
  };

  const handleValueChange = (value: number) => {
    onValueChange(value);
  };

  console.log(`product row id ${product.product.id}`, product);

  return (
    <Table.Row>
      <DeleteIcon
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onDeleteButton(product.product.id);
        }}
      />
      <div>{product.product.name}</div>
      <Select
        options={MeasurementTypes}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => selectProduct(e)}
        value={product.measurementId.toString()}
      />
      <AmountInput
        onValueChange={(value: number) => handleValueChange(value)}
        initialValue={product.amount}
      />
    </Table.Row>
  );
}

export default ProductCartRow;

import Select from '../../../ui/Select';
import Table from '../../../ui/Table';
import { MeasurementTypes } from '../../../utils/constants';
import { ChangeEvent, MouseEvent } from 'react';
import AmountInput from './AmountInput';
// import Button from '../../../ui/Button';
import { styled } from 'styled-components';
import { IProductMeasuremenet } from '../../../interfaces/IProductMeasurement';
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
  productMeasurement: IProductMeasuremenet;
  onDeleteButton: (productId: number) => void;
  onSelectButton: (measurementId: number, productId: number) => void;
  onValueChange: (value: number) => void;
}

function ProductCartRow({
  productMeasurement,
  onDeleteButton,
  onSelectButton,
  onValueChange,
}: ProductCartRowProps) {
  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeId: number = Number(e.target.value);
    onSelectButton(typeId, productMeasurement.product.id);
  };

  const handleValueChange = (value: number) => {
    onValueChange(value);
  };

  return (
    <Table.Row>
      <DeleteIcon
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onDeleteButton(productMeasurement.product.id);
        }}
      />
      <div>{productMeasurement.product.name}</div>
      <Select
        options={MeasurementTypes}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => selectProduct(e)}
      />
      <AmountInput
        onValueChange={(value: number) => handleValueChange(value)}
      />
    </Table.Row>
  );
}

export default ProductCartRow;

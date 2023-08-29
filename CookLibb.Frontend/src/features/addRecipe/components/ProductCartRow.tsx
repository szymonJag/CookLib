import Select from '../../../ui/Select';
import Table from '../../../ui/Table';
import { MeasurementTypes } from '../../../utils/constants';
import { ChangeEvent, MouseEvent } from 'react';
import AmountInput from './AmountInput';
import Button from '../../../ui/Button';
import { styled } from 'styled-components';
import { IProductMeasuremenet } from '../../../interfaces/IProductMeasurement';

const DeleteButton = styled(Button)`
  margin-right: 1rem;
  width: min-content;
`;

// const Info = styled.div`
//   width: max-content;
// `;

interface ProductCartRowProps {
  productMeasurement: IProductMeasuremenet;
  onDeleteButton: (productId: number) => void;
  onSelectButton: (measurementId: number, productId: number) => void;
}

function ProductCartRow({
  productMeasurement,
  onDeleteButton,
  onSelectButton,
}: ProductCartRowProps) {
  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeId: number = Number(e.target.value);
    onSelectButton(typeId, productMeasurement.product.id);
  };

  return (
    <Table.Row>
      <DeleteButton
        variation='danger'
        size='small'
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          onDeleteButton(productMeasurement.product.id);
        }}
      >
        X
      </DeleteButton>
      <div>{productMeasurement.product.name}</div>
      <Select
        options={MeasurementTypes}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => selectProduct(e)}
      />
      <AmountInput />
    </Table.Row>
  );
}

export default ProductCartRow;

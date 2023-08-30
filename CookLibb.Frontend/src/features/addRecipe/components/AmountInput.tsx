import { styled } from 'styled-components';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import { useState } from 'react';
import { MouseEvent } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const AmountInputLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Inpt = styled(Input)`
  width: 5rem;
  margin: 0;
  padding: 0.8rem 0.2rem;
`;
interface AmountInputProps {
  onValueChange: (value: number) => void;
}

function AmountInput({ onValueChange }: AmountInputProps) {
  const [inputValue, setInputValue] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setInputValue(newValue);
    onValueChange(newValue); // Przekazujemy wartość do rodzica
  };

  enum OperationType {
    Add = 'add',
    Subtract = 'subtract',
  }

  const handleChangeValues = (operation: OperationType) => {
    if (operation === OperationType.Add) setInputValue((prev) => ++prev);
    if (operation === OperationType.Subtract) setInputValue((prev) => --prev);

    onValueChange(inputValue);
  };

  return (
    <AmountInputLayout>
      <Button
        size='small'
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          handleChangeValues(OperationType.Subtract);
        }}
        disabled={!inputValue}
      >
        <AiOutlineMinus />
      </Button>
      <Inpt
        type='number'
        value={inputValue}
        min={0}
        onChange={handleInputChange}
      />
      <Button
        size='small'
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          handleChangeValues(OperationType.Add);
        }}
      >
        <AiOutlinePlus />
      </Button>
    </AmountInputLayout>
  );
}

export default AmountInput;

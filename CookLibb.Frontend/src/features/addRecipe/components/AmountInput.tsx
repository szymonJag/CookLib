import { styled } from 'styled-components';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

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

function AmountInput() {
  return (
    <AmountInputLayout>
      <Button size='small'>-</Button>
      <Inpt type='number' />
      <Button size='small'>+</Button>
    </AmountInputLayout>
  );
}

export default AmountInput;

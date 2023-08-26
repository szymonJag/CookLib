import React, { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { IProductType } from '../interfaces/IProduct';

interface StyledSelectProps {
  type?: 'white';
}

export const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  &:focus {
    border: 1px solid red;
  }
`;

interface SelectProps {
  options: IProductType[];
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  type?: 'white';
  children?: ReactNode;
  registerForm?: string;
}

function Select({ options, value, onChange, type, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} type={type} onChange={onChange} {...props}>
      {options.map((opt) => (
        <option value={opt.id} key={opt.id}>
          {opt.name}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;

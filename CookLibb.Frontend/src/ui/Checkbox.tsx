import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    background-color: var(--color-silver-700);
    border-color: var(--color-silver-700);
  }
`;

const CheckboxLabel = styled.span`
  font-size: 1.5rem;
`;

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <CheckboxContainer>
    <CheckboxInput type='checkbox' checked={checked} onChange={onChange} />
    <CheckboxLabel>{label}</CheckboxLabel>
  </CheckboxContainer>
);

export default Checkbox;

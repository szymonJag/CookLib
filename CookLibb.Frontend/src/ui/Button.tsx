import styled, { css } from 'styled-components';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'secondary' | 'danger';
}

const sizes: { [key: string]: ReturnType<typeof css> } = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations: { [key: string]: ReturnType<typeof css> } = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-grey-600);

    &:hover {
      background-color: var(--color-grey-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) => sizes[props.size || 'medium']}
  ${(props) => variations[props.variation || 'primary']}

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: var(--color-grey-300);
  }
`;

export const AnimatedButton = styled(Button)`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.2s;

  &:hover {
    transform: scale(99%);
  }

  &:active {
    transform: scale(100%);
  }
`;

export const ButtonForm = styled(AnimatedButton)`
  align-self: flex-end;
  margin-top: 1rem;
`;

export const InputFile = styled.input.attrs({
  type: 'file',
})<ButtonProps>`
  width: 13rem;
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid var(--color-grey-400);
  &::file-selector-button {
    display: none;
  }
`;

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;

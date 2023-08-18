import styled, { css, DefaultTheme } from 'styled-components';

interface FormProps {
  type?: 'regular' | 'modal';
  theme?: DefaultTheme;
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-200);
      border: 1px solid var(--color-grey-300);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;

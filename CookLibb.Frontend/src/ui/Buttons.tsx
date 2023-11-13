import styled from 'styled-components';

const ButtonsLayout = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

interface ButtonsProps {
  children: React.ReactNode;
}

function Buttons({ children }: ButtonsProps) {
  return <ButtonsLayout>{children}</ButtonsLayout>;
}

export default Buttons;

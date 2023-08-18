import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Content = styled.div<{ show: boolean }>`
  position: relative;
  ${({ show }) =>
    show
      ? css`
          animation: ${fadeIn} 300ms ease-in-out;
        `
      : css`
          animation: ${fadeOut} 300ms ease-in-out;
        `}
`;

interface FadeInOutProps {
  children: React.ReactNode;
  show: boolean;
}

function FadeInOut({ children, show }: FadeInOutProps) {
  return <Content show={show}>{children}</Content>;
}

export default FadeInOut;

import styled, { css } from 'styled-components';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3';
}

const Heading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 400;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}
    
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 300;
    `}
    
  line-height: 1.4;
`;

export default Heading;

import styled, { css } from 'styled-components';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large';
}

export const Avatar = styled.img<AvatarProps>`
  ${(props) =>
    props.size === 'small' &&
    css`
      width: 5rem;
      height: 5rem;
    `}
  ${(props) =>
    props.size === 'medium' &&
    css`
      width: 10rem;
      height: 10rem;
    `}
    ${(props) =>
    props.size === 'large' &&
    css`
      width: 15rem;
      height: 15rem;
    `}

  border-radius: 50%;
  border: 1px solid var(--color-grey-400);
`;

Avatar.defaultProps = {
  size: 'small',
};

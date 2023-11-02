import styled from 'styled-components';

interface PageSectionProps {
  orientation?: 'column' | 'row';
}

export const PageSection = styled.div<PageSectionProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === 'column' ? 'column' : 'row'};
  /* align-items: center; */
  justify-content: space-around;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  gap: 4rem;
`;

PageSection.defaultProps = {
  orientation: 'row',
};

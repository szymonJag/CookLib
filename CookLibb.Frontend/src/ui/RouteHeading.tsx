import { styled } from 'styled-components';
import Heading from './Heading';

const RouteHead = styled(Heading)`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
`;

interface RouteHeadingProps {
  text: string;
}

function RouteHeading({ text }: RouteHeadingProps) {
  return <RouteHead as='h1'>{text}</RouteHead>;
}

export default RouteHeading;

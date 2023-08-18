import { styled } from 'styled-components';
import RouteHeading from '../../ui/RouteHeading';
import ProductsSection from './components/Products/ProductsSection';
import Heading from '../../ui/Heading';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function AdminLayout() {
  return (
    <Layout>
      <RouteHeading text='Panel administratora' />
      <Sections>
        <Heading as='h2'>Zarządzaj produktami</Heading>
        <ProductsSection />
        <Heading as='h2'>Zarządzaj produktami</Heading>
        <ProductsSection />
      </Sections>
    </Layout>
  );
}

export default AdminLayout;

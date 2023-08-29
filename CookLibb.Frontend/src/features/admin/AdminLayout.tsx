import RouteHeading from '../../ui/RouteHeading';
import ProductsSection from './components/Products/ProductsSection';
import Heading from '../../ui/Heading';
import { Layout, SiteSections } from '../../ui/SiteSections';

function AdminLayout() {
  return (
    <Layout>
      <RouteHeading text='Panel administratora' />
      <SiteSections>
        <Heading as='h2'>Zarządzaj produktami</Heading>
        <ProductsSection />
      </SiteSections>
    </Layout>
  );
}

export default AdminLayout;

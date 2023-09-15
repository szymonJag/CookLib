import ProductsSection from './components/Products/IngredientsSection';
import Heading from '../../ui/Heading';
import { Layout, SiteSections } from '../../ui/SiteSections';

function AdminLayout() {
  return (
    <Layout>
      <SiteSections>
        <Heading as='h2'>Zarządzaj produktami</Heading>
        <ProductsSection />
      </SiteSections>
    </Layout>
  );
}

export default AdminLayout;

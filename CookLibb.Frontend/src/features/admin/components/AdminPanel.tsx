import ProductsSection from './IngredientsSection';
import Heading from '../../../ui/Heading';
import { PanelLayout, PanelSection } from '../../../ui/SiteSections';
import UsersSection from './UsersSection';

function AdminLayout() {
  return (
    <PanelLayout>
      <PanelSection>
        <Heading as='h2'>Zarządzaj produktami</Heading>
        <ProductsSection />
      </PanelSection>
      <PanelSection>
        <Heading as='h2'>Zarządzaj użytkownikami</Heading>
        <UsersSection />
      </PanelSection>
    </PanelLayout>
  );
}

export default AdminLayout;

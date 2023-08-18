import { AdminSectionLayout } from '../../../../ui/AdminSectionLayout';
import ProductForm from './ProductForm';
import ProductsTable from './ProductsTable';

function ProductsSection() {
  return (
    <AdminSectionLayout>
      <ProductForm />
      <ProductsTable />
    </AdminSectionLayout>
  );
}

export default ProductsSection;

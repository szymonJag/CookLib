import { useState } from 'react';
import { AdminSectionLayout } from '../../../../ui/AdminSectionLayout';
import ProductForm from './ProductForm';
import ProductsTable from './ProductsTable';
import {
  IProduct,
  IUpdateProductRequest,
} from '../../../../interfaces/IProduct';

function ProductsSection() {
  const [productToEdit, setProductToEdit] = useState<
    IUpdateProductRequest | undefined
  >(undefined);
  const [isEditable, setIsEditable] = useState(false);

  function handleEditClick(product: IProduct) {
    const prdct: IUpdateProductRequest = {
      id: product.id,
      kcal: product.kcal,
      name: product.name,
      type: product.type.id,
    };
    setIsEditable(true);
    setProductToEdit(prdct);
  }

  return (
    <AdminSectionLayout>
      <ProductForm
        product={productToEdit}
        isEditable={isEditable}
        handleBackClick={() => {
          setProductToEdit(undefined);
          setIsEditable(false);
        }}
      />
      <ProductsTable handleEdit={handleEditClick} />
    </AdminSectionLayout>
  );
}

export default ProductsSection;

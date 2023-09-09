import { useState } from 'react';
import { AdminSectionLayout } from '../../../../ui/AdminSectionLayout';
import ProductForm from './IngredientForm';
import ProductsTable from './IngredientsTable';
import {} from '../../../../interfaces/IIngredient';

function ProductsSection() {
  const [ingredientToEdit, setIngredientToEdit] = useState<
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
    setIngredientToEdit(prdct);
  }

  return (
    <AdminSectionLayout>
      <ProductForm
        product={ingredientToEdit}
        isEditable={isEditable}
        handleBackClick={() => {
          setIngredientToEdit(undefined);
          setIsEditable(false);
        }}
      />
      <ProductsTable handleEdit={handleEditClick} />
    </AdminSectionLayout>
  );
}

export default ProductsSection;

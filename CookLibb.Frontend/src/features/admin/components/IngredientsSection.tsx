import { useState } from 'react';
import { AdminSectionLayout } from '../../../ui/AdminSectionLayout';
import ProductForm from './IngredientForm';
import ProductsTable from './IngredientsTable';
import {
  IIngredient,
  IUpdateIngredientRequest,
} from '../../../interfaces/IIngredient';

function ProductsSection() {
  const [ingredientToEdit, setIngredientToEdit] = useState<
    IUpdateIngredientRequest | undefined
  >(undefined);
  const [isEditable, setIsEditable] = useState(false);

  function handleEditClick(product: IIngredient) {
    const prdct: IUpdateIngredientRequest = {
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

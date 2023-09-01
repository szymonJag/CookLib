import AddRecipeLayout from '../features/addRecipe/components/AddRecipeLayout';
import RouteHeading from '../ui/RouteHeading';

function AddRecipe() {
  return (
    <>
      <RouteHeading text='Dodaj przepis' />
      <AddRecipeLayout />
    </>
  );
}

export default AddRecipe;

import AddRecipeLayout from '../features/addRecipe/AddRecipeLayout';
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

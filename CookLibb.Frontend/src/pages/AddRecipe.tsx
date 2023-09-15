import AddRecipeLayout from '../features/addRecipe/components/AddRecipeLayout';
import { PageContent } from '../ui/PageContent';
import RouteHeading from '../ui/RouteHeading';

function AddRecipe() {
  return (
    <>
      <RouteHeading text='Dodaj przepis' />
      <PageContent>
        <AddRecipeLayout />
      </PageContent>
    </>
  );
}

export default AddRecipe;

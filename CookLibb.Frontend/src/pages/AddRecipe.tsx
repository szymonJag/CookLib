import { useParams } from 'react-router-dom';
import AddRecipeLayout from '../features/addRecipe/components/AddRecipeLayout';
import { PageContent } from '../ui/PageContent';
import RouteHeading from '../ui/RouteHeading';

function AddRecipe() {
  const { recipeId } = useParams<{ recipeId?: string }>();
  const welcomeText = recipeId ? 'Edytuj' : 'Dodaj';

  return (
    <>
      <RouteHeading text={`${welcomeText} przepis`} />
      <PageContent>
        <AddRecipeLayout />
      </PageContent>
    </>
  );
}

export default AddRecipe;

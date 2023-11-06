import { useUserContext } from '../../../contexts/UserContext';
import Spinner from '../../../ui/Spinner';
import { useGetRecipesCreatedByUser } from '../hooks/useGetRecipesCreatedByUser';
import CreatedRecipesList from './CreatedRecipesList';

function CreatedRecipes() {
  const userContext = useUserContext();
  const { created, isLoading } = useGetRecipesCreatedByUser(
    userContext.user?.id || 0
  );

  console.log(`created`, created);

  return isLoading ? (
    <Spinner />
  ) : (
    <CreatedRecipesList shortRecipeList={created} />
  );
}

export default CreatedRecipes;

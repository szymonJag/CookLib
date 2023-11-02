import { useUserContext } from '../../../contexts/UserContext';
import Spinner from '../../../ui/Spinner';
import { useGetUserFavouritesRecipes } from '../hooks/useGetUserFavouritesRecipes';
import ShortRecipeList from './ShortRecipesList';

function FavouriteRecipesList() {
  const userContext = useUserContext();
  const { favourites, isLoading } = useGetUserFavouritesRecipes(
    userContext.user?.id || 0
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <ShortRecipeList shortRecipeList={favourites} />
  );
}

export default FavouriteRecipesList;

import { useUserContext } from '../../../contexts/UserContext';
import Spinner from '../../../ui/Spinner';
import { useGetUserFavouritesRecipes } from '../hooks/useGetUserFavouritesRecipes';
import FavouriteRecipeList from './FavouriteRecipesList';

function FavouriteRecipesList() {
  const userContext = useUserContext();
  const { favourites, isLoading } = useGetUserFavouritesRecipes(
    userContext.user?.id || 0
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <FavouriteRecipeList shortRecipeList={favourites} />
  );
}

export default FavouriteRecipesList;

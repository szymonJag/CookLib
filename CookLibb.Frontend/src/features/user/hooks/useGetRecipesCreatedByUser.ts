import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../../../contexts/UserContext';
import { getUserFavouritesRecipes } from '../../../services/apiRecipes';
import { IShortRecipe } from '../../../interfaces/IRecipe';

export function useGetRecipesCreatedByUser(userId: number) {
  const context = useUserContext();
  const token = context.token;
  const { isLoading, data, error } = useQuery({
    queryKey: ['created'],
    queryFn: () => getUserFavouritesRecipes(userId, token),
  });

  const favourites: IShortRecipe[] = data;
  console.log(`fav`, favourites);
  return { isLoading, favourites, error };
}

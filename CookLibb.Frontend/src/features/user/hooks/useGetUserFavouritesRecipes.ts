import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../../../contexts/UserContext';
import { getUserFavouritesRecipes } from '../../../services/apiRecipes';
import { IShortRecipe } from '../../../interfaces/IRecipe';

export function useGetUserFavouritesRecipes(userId: number) {
  const context = useUserContext();
  const token = context.token;
  const { isLoading, data, error } = useQuery({
    queryKey: ['favourites'],
    queryFn: () => getUserFavouritesRecipes(userId, token),
  });

  const favourites: IShortRecipe[] = data;
  return { isLoading, favourites, error };
}

import { useQuery } from '@tanstack/react-query';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { getShortRecipes } from '../../../services/apiRecipes';
import { RecipeStatus } from '../../../utils/constants';
import { useUserContext } from '../../../contexts/UserContext';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useGetAllRecipes() {
  const { token } = useUserContext();

  const { isLoading, data, error } = useQuery({
    queryKey: ['admin-recipes'],
    queryFn: () => getShortRecipes('', RecipeStatus.Wszystkie, token),
  });

  const recipes: IShortRecipe[] = data;

  return { isLoading, recipes, error };
}

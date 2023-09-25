import { useQuery } from '@tanstack/react-query';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { getShortRecipes } from '../../../services/apiRecipes';

export function useGetShortRecipes(recipeName: string = '') {
  const { isLoading, data, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getShortRecipes(recipeName),
  });

  const recipes: IShortRecipe[] = data;
  return { isLoading, recipes, error };
}

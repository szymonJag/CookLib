import { useQuery } from '@tanstack/react-query';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { getShortRecipes } from '../../../services/apiRecipes';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useGetAllRecipes() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['short-recipes'],
    queryFn: () => getShortRecipes(''),
  });

  const recipes: IShortRecipe[] = data;

  return { isLoading, recipes, error };
}

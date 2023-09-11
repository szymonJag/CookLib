import { useQuery } from '@tanstack/react-query';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { getShortRecipes } from '../../../services/apiRecipes';

export function useGetRecipes(recipeName: string = '') {
  console.log(`GET RECIPES ELO `);
  const { isLoading, data, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getShortRecipes(recipeName),
  });

  const recipes: IShortRecipe[] = data;
  console.log(recipes);
  return { isLoading, recipes, error };
}

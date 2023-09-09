import { useQuery } from '@tanstack/react-query';
import { IRecipe } from '../../../interfaces/IRecipe';
import { getRecipes } from '../../../services/apiRecipes';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useGetRecipes(recipeName: string = '') {
  console.log(`GET RECIPES ELO `);
  const { isLoading, data, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(recipeName),
  });

  const recipes: IRecipe[] = data;
  console.log(recipes);
  return { isLoading, recipes, error };
}

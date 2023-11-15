import { useQuery } from '@tanstack/react-query';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { getShortRecipes } from '../../../services/apiRecipes';
import { useUserContext } from '../../../contexts/UserContext';
import { RecipeStatus } from '../../../utils/constants';

export function useGetShortRecipes(recipeName: string = '') {
  const context = useUserContext();
  const token = context.token;
  const { isLoading, data, error } = useQuery({
    queryKey: ['recipe', 'recipes'],
    queryFn: () =>
      getShortRecipes(recipeName, RecipeStatus.Zweryfikowany, token),
  });

  const recipes: IShortRecipe[] = data;
  return { isLoading, recipes, error };
}

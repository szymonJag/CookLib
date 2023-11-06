import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../../../contexts/UserContext';
import { getRecipesCreatedByUser } from '../../../services/apiRecipes';
import { IShortRecipe } from '../../../interfaces/IRecipe';

export function useGetRecipesCreatedByUser(userId: number) {
  const context = useUserContext();
  const token = context.token;
  const { isLoading, data, error } = useQuery({
    queryKey: ['created'],
    queryFn: () => getRecipesCreatedByUser(userId, token),
  });

  const created: IShortRecipe[] = data;
  return { isLoading, created, error };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '../../../contexts/UserContext';
import { RecipeStatus } from '../../../utils/constants';
import { changeRecipeStatus } from '../../../services/apiRecipes';

export function useChangeRecipeStatus() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading: isChanging, mutate: changeRecipeStatusMt } = useMutation(
    (mutationData: { recipeId: number; newStatus: RecipeStatus }) =>
      changeRecipeStatus(mutationData.recipeId, mutationData.newStatus, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['recipe', 'recipes'],
        });
      },
      onError: (err: Error) => {
        console.log(`err`, err.message);
      },
    }
  );

  return { isChanging, changeRecipeStatusMt };
}

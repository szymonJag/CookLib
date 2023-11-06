import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useUserContext } from '../../../contexts/UserContext';
import { deleteCreatedRecipe } from '../../../services/apiRecipes';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useDeleteCreatedRecipe() {
  const queryClient = useQueryClient();
  const context = useUserContext();
  const token = context.token;

  const { isLoading: isDeleting, mutate: deleteCreatedRecipeMt } = useMutation({
    mutationFn: (recipeId: number) => deleteCreatedRecipe(recipeId, token),
    onSuccess: () => {
      console.log(`token`, token);

      queryClient.invalidateQueries({
        queryKey: ['created', 'recipes'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteCreatedRecipeMt };
}

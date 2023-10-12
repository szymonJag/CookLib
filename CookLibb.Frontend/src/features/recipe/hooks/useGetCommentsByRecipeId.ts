import { useQuery } from '@tanstack/react-query';
import { IComment } from '../../../interfaces/IComment';
import { getCommentsByRecipeId } from '../../../services/apiComments';
import { useUserContext } from '../../../contexts/UserContext';

export function useGetCommentsByRecipeId(recipeId: number) {
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading, data, error } = useQuery({
    queryKey: ['comments', recipeId],
    queryFn: () => getCommentsByRecipeId(recipeId, token),
  });

  const comments: IComment[] = data;

  return { isLoading, comments, error };
}

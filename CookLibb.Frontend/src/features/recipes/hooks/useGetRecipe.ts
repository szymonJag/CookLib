import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '../../../services/apiRecipes';
import { IRecipe } from '../../../interfaces/IRecipe';
import { useParams } from 'react-router-dom';

export function useGetRecipe() {
  const params = useParams();
  const { recipeId } = params;

  const { isLoading, data, error } = useQuery<IRecipe, Error>({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(Number(recipeId)),
  });

  const recipe: IRecipe | undefined = data;

  return { isLoading, recipe, error };
}

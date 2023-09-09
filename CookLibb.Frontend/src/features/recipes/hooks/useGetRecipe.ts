import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
// import { IRecipe } from '../../../interfaces/IRecipe';
import { getRecipeById } from '../../../services/apiRecipes';
import { IRecipe } from '../../../interfaces/IRecipe';

export function useGetRecipe() {
  //   const params = useParams();
  //   const { productId } = params;
  console.log('Recipe ID');
  const recipeId = 33;
  console.log(recipeId);

  const { isLoading, data, error } = useQuery<IRecipe, Error>({
    queryKey: ['recipe'],
    queryFn: () => getRecipeById(Number(recipeId)),
  });

  const recipe: IRecipe | undefined = data;

  return { isLoading, recipe, error };
}

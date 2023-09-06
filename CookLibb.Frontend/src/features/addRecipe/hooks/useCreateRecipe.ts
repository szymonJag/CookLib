import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { addRecipe } from '../../../services/apiRecipes';
import { IAddRecipeRequest } from '../../../interfaces/IRecipe';
import { useState } from 'react';

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const [recipeId, setRecipeId] = useState<number | null>(null);

  const { isLoading: isCreating, mutate: createRecipeMt } = useMutation(
    async (recipe: IAddRecipeRequest) => addRecipe(recipe),
    {
      onSuccess: (data) => {
        setRecipeId(data.id + 1);
        console.log(`data`, data);
        toast.success(`Produkt ${data.name} został dodany!`);
        queryClient.invalidateQueries({
          queryKey: ['products'],
        });

        console.log(recipeId);
      },
      onError: (err: Error) => {
        console.log(`err`, err.message);
        toast.error(
          `Coś poszło nie tak, sprawdź console log po więcej informacji`
        );
      },
    }
  );

  return { isCreating, createRecipeMt, recipeId };
}

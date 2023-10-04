import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { IAddRecipeRequest } from '../../../interfaces/IRecipe';
import { addRecipe } from '../../../services/apiRecipes';
import { uploadImage } from '../../../services/apiUploadImages';
import { useUserContext } from '../../../contexts/UserContext';

type CreateRecipeType = {
  recipe: IAddRecipeRequest;
  images: FileList;
};

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();

  const { isLoading: isCreating, mutate: createRecipeMt } = useMutation({
    mutationFn: ({ recipe, images }: CreateRecipeType) =>
      addRecipeWithImage(recipe, images, userContext.token),
    onSuccess: () => {
      toast.success('Recipe added');
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
    },
    onError: (err: Error) => {
      console.log(`err`, err.message);
      toast.error(`Something went wrong`);
    },
  });

  return { isCreating, createRecipeMt };
}
async function addRecipeWithImage(
  recipe: IAddRecipeRequest,
  images: FileList,
  token: string
) {
  try {
    const recipeData = await addRecipe(recipe, token);
    console.log(`recipeData`, recipeData);

    if (images.length > 0) {
      const recipeId = recipeData.id;
      await uploadImage(images, recipeId);
    }

    return recipeData;
  } catch (err) {
    console.error(`Error with adding recipe and uploading image: ${err}`);
  }
}

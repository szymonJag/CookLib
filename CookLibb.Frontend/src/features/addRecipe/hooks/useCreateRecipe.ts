import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { IAddRecipeRequest } from '../../../interfaces/IRecipe';
import { addRecipe } from '../../../services/apiRecipes';
import { uploadImage } from '../../../services/apiUploadImages';

type CreateRecipeType = {
  recipe: IAddRecipeRequest;
  images: FileList;
};

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createRecipeMt } = useMutation({
    mutationFn: ({ recipe, images }: CreateRecipeType) =>
      addRecipeWithImage(recipe, images),
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
async function addRecipeWithImage(recipe: IAddRecipeRequest, images: FileList) {
  try {
    const recipeData = await addRecipe(recipe);
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

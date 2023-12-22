import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '../../../contexts/UserContext';
import { IAddRecipeRequest } from '../../../interfaces/IRecipe';
import toast from 'react-hot-toast';
import { editRecipe } from '../../../services/apiRecipes';

type EditRecipeType = {
  recipe: IAddRecipeRequest;
  images: FileList | null;
};

export function useEditRecipe() {
  const queryClient = useQueryClient();
  const { token } = useUserContext();

  const { isLoading: isEditing, mutate: editRecipeMt } = useMutation({
    mutationFn: ({ recipe, images }: EditRecipeType) =>
      editRecipeWithImage(recipe, images, token),
    onSuccess: () => {
      toast.success('Przepis edytowano!');
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
    },
  });

  return { isEditing, editRecipeMt };
}

async function editRecipeWithImage(
  recipe: IAddRecipeRequest,
  images: FileList | null,
  token: string
) {
  try {
    await editRecipe(recipe, recipe.recipeId, token);
    if (images !== null) {
      console.log(images);
    }
  } catch (err) {
    console.error(`Error with adding recipe and uploading image: ${err}`);
  }
}

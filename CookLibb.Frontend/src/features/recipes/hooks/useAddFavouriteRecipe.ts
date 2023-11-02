import { toast } from 'react-hot-toast';
import { toggleFavouriteRecipe } from '../../../services/apiRecipes';
import { useUserContext } from '../../../contexts/UserContext';
import { useMutation } from '@tanstack/react-query';

export function useAddFavouriteRecipe() {
  // const queryClient = useQueryClient();
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading: isAdding, mutate: addFavouriteRecipeMt } = useMutation(
    (recipeId: number) => toggleFavouriteRecipe(recipeId, token),
    {
      onSuccess: () => {
        toast.success(`Dodano do ulubionych!`);
        // queryClient.invalidateQueries({
        //   queryKey: ['favourites', 'user'],
        // });
      },
      onError: (err: Error) => {
        console.log(`err`, err.message);
        toast.error(
          `Coś poszło nie tak, sprawdź console log po więcej informacji`
        );
      },
    }
  );

  return { isAdding, addFavouriteRecipeMt };
}

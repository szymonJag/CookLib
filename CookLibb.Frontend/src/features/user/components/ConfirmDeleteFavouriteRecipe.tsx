import { useQueryClient } from '@tanstack/react-query';
import Button from '../../../ui/Button';
import { useAddFavouriteRecipe } from '../../recipes/hooks/useAddFavouriteRecipe';
import { useUserContext } from '../../../contexts/UserContext';

interface ConfirmDeleteFavouriteRecipeProps {
  recipeId: number;
}

function ConfirmDeleteFavouriteRecipe({
  recipeId,
}: ConfirmDeleteFavouriteRecipeProps) {
  const { addFavouriteRecipeMt } = useAddFavouriteRecipe();
  const queryClient = useQueryClient();
  const userContext = useUserContext();

  const handleDelete = () => {
    queryClient.invalidateQueries({
      queryKey: ['favourites'],
    });
    addFavouriteRecipeMt(recipeId);
    userContext.toggleFavouriteRecipe(recipeId);
  };

  return (
    <div>
      Czy na pewno chcesz usunąć ten przepis z ulubionych? `
      <Button onClick={handleDelete}>Tak</Button>
    </div>
  );
}

export default ConfirmDeleteFavouriteRecipe;

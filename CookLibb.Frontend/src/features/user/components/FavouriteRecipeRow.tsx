import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import SliderComponent from '../../../ui/Slider';
import Table from '../../../ui/Table';
import Heading from '../../../ui/Heading';
import { useQueryClient } from '@tanstack/react-query';
import Button from '../../../ui/Button';
import { useAddFavouriteRecipe } from '../../recipes/hooks/useAddFavouriteRecipe';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const HeadingRow = styled(Heading)`
  text-align: center;
`;

interface ShortRecipeRowProps {
  shortRecipe: IShortRecipe;
}

function FavouriteRecipeRow({ shortRecipe }: ShortRecipeRowProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { addFavouriteRecipeMt, isAdding } = useAddFavouriteRecipe();
  const userContext = useUserContext();

  const handleDeleteFromFavourites = (id: number) => {
    addFavouriteRecipeMt(id);
    userContext.toggleFavouriteRecipe(id);
  };
  queryClient.invalidateQueries({
    queryKey: ['favourites'],
  });
  return (
    <Table.Row>
      <SliderComponent images={shortRecipe.images} height='auto' width='100%' />
      <HeadingRow as='h2'>{shortRecipe.name}</HeadingRow>
      <Buttons>
        <Button
          variation='secondary'
          onClick={() => navigate(`/recipes/${shortRecipe.id}`)}
        >
          Pokaż
        </Button>
        <Button
          variation='danger'
          onClick={() => handleDeleteFromFavourites(shortRecipe.id)}
          disabled={isAdding}
        >
          Usuń z ulubionych
        </Button>
      </Buttons>
    </Table.Row>
  );
}

export default FavouriteRecipeRow;

import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import SliderComponent from '../../../ui/Slider';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import Heading from '../../../ui/Heading';
import { useNavigate } from 'react-router-dom';
import { useAddFavouriteRecipe } from '../../recipes/hooks/useAddFavouriteRecipe';
import { useUserContext } from '../../../contexts/UserContext';
import { useQueryClient } from '@tanstack/react-query';

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

interface ShortRecipeRowProps {
  shortRecipe: IShortRecipe;
}

function ShortRecipeRow({ shortRecipe }: ShortRecipeRowProps) {
  const navigate = useNavigate();
  const { addFavouriteRecipeMt } = useAddFavouriteRecipe();
  const userContext = useUserContext();
  const queryClient = useQueryClient();

  const handleDeleteFromFavourites = () => {
    addFavouriteRecipeMt(shortRecipe.id);
    userContext.toggleFavouriteRecipe(shortRecipe.id);
  };

  queryClient.invalidateQueries({
    queryKey: ['favourites'],
  });

  return (
    <Table.Row>
      <SliderComponent images={shortRecipe.images} height='auto' width='100%' />
      <Heading as='h3'>{shortRecipe.name}</Heading>
      <Buttons>
        <Button
          variation='secondary'
          onClick={() => navigate(`/recipes/${shortRecipe.id}`)}
        >
          Pokaż
        </Button>
        <Button variation='danger' onClick={handleDeleteFromFavourites}>
          Usuń
        </Button>
      </Buttons>
    </Table.Row>
  );
}

export default ShortRecipeRow;

import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Buttons from './Buttons';
import SliderComponent from './Slider';
import Table from './Table';
import styled from 'styled-components';
import Heading from './Heading';
import { IShortRecipe } from '../interfaces/IRecipe';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteCreatedRecipe } from '../features/user/hooks/useDeleteCreatedRecipe';
import { RecipeStatus } from '../utils/constants';

const HeadingRow = styled(Heading)`
  text-align: center;
`;

const ActionButtons = styled(Buttons)`
  justify-content: flex-end;
`;

interface RecipeRowProps {
  recipe: IShortRecipe;
}

function RecipeRow({ recipe }: RecipeRowProps) {
  const navigate = useNavigate();
  const { deleteCreatedRecipeMt, isDeleting } = useDeleteCreatedRecipe();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteCreatedRecipeMt(recipe.id);
  };

  queryClient.invalidateQueries({
    queryKey: ['created'],
  });

  return (
    <Table.Row>
      <SliderComponent images={recipe.images} height='auto' width='100%' />
      <HeadingRow as='h2'>{recipe.name}</HeadingRow>
      <HeadingRow as='h3'>{RecipeStatus[recipe.status]}</HeadingRow>
      <ActionButtons>
        <Button
          variation='secondary'
          onClick={() => navigate(`/recipes/${recipe.id}`)}
        >
          Pokaż
        </Button>
        <Button>Edytuj</Button>
        <Button
          variation='danger'
          onClick={() => handleDelete()}
          disabled={isDeleting}
        >
          Usuń
        </Button>
      </ActionButtons>
    </Table.Row>
  );
}

export default RecipeRow;

import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Heading from '../../../ui/Heading';
import SliderComponent from '../../../ui/Slider';
import Table from '../../../ui/Table';
import Button from '../../../ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDeleteCreatedRecipe } from '../hooks/useDeleteCreatedRecipe';

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const HeadingRow = styled(Heading)`
  text-align: center;
`;

interface CreatedRecipeRowProps {
  shortRecipe: IShortRecipe;
}

function CreatedRecipeRow({ shortRecipe }: CreatedRecipeRowProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deleteCreatedRecipeMt, isDeleting } = useDeleteCreatedRecipe();

  queryClient.invalidateQueries({
    queryKey: ['created'],
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
        <Button>Edytuj</Button>
        <Button
          variation='danger'
          onClick={() => deleteCreatedRecipeMt(shortRecipe.id)}
          disabled={isDeleting}
        >
          Usuń
        </Button>
      </Buttons>
    </Table.Row>
  );
}

export default CreatedRecipeRow;

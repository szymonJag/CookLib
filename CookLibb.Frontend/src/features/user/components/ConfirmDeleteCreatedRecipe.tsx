import { useQueryClient } from '@tanstack/react-query';
import Button from '../../../ui/Button';
import { useDeleteCreatedRecipe } from '../hooks/useDeleteCreatedRecipe';
import styled from 'styled-components';
import Heading from '../../../ui/Heading';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface ConfirmDeleteCreatedRecipeProps {
  recipeId: number;
}

function ConfirmDeleteCreatedRecipe({
  recipeId,
}: ConfirmDeleteCreatedRecipeProps) {
  const { deleteCreatedRecipeMt, isDeleting } = useDeleteCreatedRecipe();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteCreatedRecipeMt(recipeId);
  };

  queryClient.invalidateQueries({
    queryKey: ['created'],
  });
  return (
    <Layout>
      <Heading as='h2'>Czy na pewno chcesz usunąć ten przepis?</Heading>
      <Heading as='h3'>Zmiana będzie nieodwracalna.</Heading>
      <Button onClick={handleDelete} disabled={isDeleting} variation='danger'>
        Tak
      </Button>
    </Layout>
  );
}

export default ConfirmDeleteCreatedRecipe;

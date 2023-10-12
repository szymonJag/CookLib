import styled from 'styled-components';
import { IRecipe } from '../../../interfaces/IRecipe';
import { useGetCommentsByRecipeId } from '../hooks/useGetCommentsByRecipeId';
import RecipeComment from './RecipeComment';
import Heading from '../../../ui/Heading';

const RecipeCommentListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface RecipeCommentListProps {
  recipe: IRecipe;
}

function RecipeCommentList({ recipe }: RecipeCommentListProps) {
  const { comments } = useGetCommentsByRecipeId(recipe.id);
  return (
    <RecipeCommentListLayout>
      {comments && comments.length > 0 ? (
        comments.map((comment) => <RecipeComment comment={comment} />)
      ) : (
        <Heading as='h3'>Brak komentarzy</Heading>
      )}
    </RecipeCommentListLayout>
  );
}

export default RecipeCommentList;

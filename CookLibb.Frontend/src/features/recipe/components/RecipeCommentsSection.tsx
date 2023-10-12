import styled from 'styled-components';
import Heading from '../../../ui/Heading';
import AddComment from './AddComment';
import { IRecipe } from '../../../interfaces/IRecipe';
import RecipeCommentList from './RecipeCommentList';

const RecipeCommentsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const CommentHeading = styled(Heading)`
  align-self: flex-start;
`;

interface RecipeCommentsProps {
  recipe: IRecipe;
}

function RecipeCommentsSection({ recipe }: RecipeCommentsProps) {
  return (
    <RecipeCommentsLayout>
      <CommentHeading as='h2'>Komentarze</CommentHeading>
      <AddComment recipe={recipe} />
      <RecipeCommentList recipe={recipe} />
    </RecipeCommentsLayout>
  );
}

export default RecipeCommentsSection;

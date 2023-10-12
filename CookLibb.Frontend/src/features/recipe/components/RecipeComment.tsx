import { IComment } from '../../../interfaces/IComment';

interface RecipeCommentProps {
  comment: IComment;
}

function RecipeComment({ comment }: RecipeCommentProps) {
  return <div>{comment.description}</div>;
}

export default RecipeComment;

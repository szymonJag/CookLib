import styled from 'styled-components';
import Button from '../../../ui/Button';
import TextArea from '../../../ui/TextArea';
import { useState } from 'react';
import { useAddComment } from '../hooks/useAddComment';
import { IRecipe } from '../../../interfaces/IRecipe';
import { IAddCommentRequest } from '../../../interfaces/IComment';
import { useUserContext } from '../../../contexts/UserContext';

const CommentButton = styled(Button)``;

const AddCommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

interface AddCommentProps {
  recipe: IRecipe;
}

function AddComment({ recipe }: AddCommentProps) {
  const [description, setDescription] = useState<string>('');
  const { isAdding, addCommentMt } = useAddComment();
  const userContext = useUserContext();

  const handleAddComment = () => {
    const comment: IAddCommentRequest = {
      authorId: userContext.user!.id,
      description: description,
      recipeId: recipe.id,
    };
    addCommentMt(comment);
  };

  return (
    <AddCommentLayout>
      <TextArea value={description} onChange={setDescription} />
      {userContext.user ? (
        <CommentButton onClick={handleAddComment} disabled={isAdding}>
          Dodaj komentarz
        </CommentButton>
      ) : (
        <span>Musisz się zalogować żeby dodawać komentarze</span>
      )}
    </AddCommentLayout>
  );
}

export default AddComment;

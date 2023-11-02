import styled from 'styled-components';
import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';
import { IComment } from '../../../interfaces/IComment';
import { useDeleteComment } from '../hooks/useDeleteComment';

const DeleteCommentModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface DeleteCommentModalProps {
  comment: IComment;
}

function DeleteCommentModal({ comment }: DeleteCommentModalProps) {
  const { isDeleting, deleteCommentByIdMt } = useDeleteComment();

  const deleteComment = () => {
    deleteCommentByIdMt(comment.id);
  };

  return (
    <DeleteCommentModalLayout>
      <Heading as='h3'>Czy na pewno chcesz usunąć ten komentarz?</Heading>
      <Button variation='danger' onClick={deleteComment} disabled={isDeleting}>
        Tak
      </Button>
    </DeleteCommentModalLayout>
  );
}

export default DeleteCommentModal;

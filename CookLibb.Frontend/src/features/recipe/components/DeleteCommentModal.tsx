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

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
`;

interface DeleteCommentModalProps {
  comment: IComment;
  onCloseModal?: () => void;
}

function DeleteCommentModal({
  comment,
  onCloseModal,
}: DeleteCommentModalProps) {
  const { isDeleting, deleteCommentByIdMt } = useDeleteComment();

  const deleteComment = () => {
    deleteCommentByIdMt(comment.id);
    onCloseModal!();
  };

  return (
    <DeleteCommentModalLayout>
      <Heading as='h3'>Czy na pewno chcesz usunąć ten komentarz?</Heading>
      <Buttons>
        <Button variation='secondary' onClick={() => onCloseModal!()}>
          Nie
        </Button>
        <Button
          variation='danger'
          onClick={deleteComment}
          disabled={isDeleting}
        >
          Tak
        </Button>
      </Buttons>
    </DeleteCommentModalLayout>
  );
}

export default DeleteCommentModal;

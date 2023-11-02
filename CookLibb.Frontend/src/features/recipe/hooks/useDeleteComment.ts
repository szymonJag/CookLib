import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '../../../contexts/UserContext';
import { deleteCommentById } from '../../../services/apiComments';
import toast from 'react-hot-toast';

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading: isDeleting, mutate: deleteCommentByIdMt } = useMutation(
    (commentId: number) => deleteCommentById(commentId, token),
    {
      onSuccess: (data) => {
        if (data) toast.success('Usunięto komentarz');
        queryClient.invalidateQueries({
          queryKey: ['comments'],
        });
      },
      onError: (err: Error) => {
        console.log(`err`, err.message);
        toast.error(
          `Coś poszło nie tak, sprawdź console log po więcej informacji`
        );
      },
    }
  );

  return { isDeleting, deleteCommentByIdMt };
}

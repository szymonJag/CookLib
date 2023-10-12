import { toast } from 'react-hot-toast';
import { useUserContext } from '../../../contexts/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../../services/apiComments';
import { IAddCommentRequest } from '../../../interfaces/IComment';

export function useAddComment() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading: isAdding, mutate: addCommentMt } = useMutation(
    (comment: IAddCommentRequest) => addComment(comment, token),
    {
      onSuccess: () => {
        toast.success(`Dodano do ulubionych!`);
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

  return { isAdding, addCommentMt };
}

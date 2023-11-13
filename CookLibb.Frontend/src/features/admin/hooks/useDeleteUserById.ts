import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteUserById } from '../../../services/apiUsers';
import { useUserContext } from '../../../contexts/UserContext';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useDeleteUserById() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading: isDeleting, mutate: deleteUserByIdMt } = useMutation({
    mutationFn: (userId: number) => deleteUserById(userId, token),
    onSuccess: (context) => {
      if (context.response && context.response.status === 400)
        toast.error('Coś poszło nie tak');
      toast.success('Produkt został usunięty');

      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteUserByIdMt };
}

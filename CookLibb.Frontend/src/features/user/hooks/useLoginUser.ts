import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { IRequestAuthenticateUser } from '../../../interfaces/IUser';
import { loginUser } from '../../../services/apiUsers';

export function useLoginUser() {
  const queryClient = useQueryClient();

  const {
    isLoading: isCreating,
    mutate: loginUserMt,
    data,
  } = useMutation({
    mutationFn: (user: IRequestAuthenticateUser) => loginUser(user),
    onSuccess: (data) => {
      if (!data.error) {
        toast.success(`Udało Ci się zalogować na konto ${data.username}`);
      }
      if (data.error) toast.error(`Coś poszło nie tak!`);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err: Error) => {
      toast.error(`Something went wrong. ${err.message}`);
    },
  });

  return { isCreating, loginUserMt, data };
}

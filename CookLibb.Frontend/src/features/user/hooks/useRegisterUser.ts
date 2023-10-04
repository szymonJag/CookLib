import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { IRequestAuthenticateUser } from '../../../interfaces/IUser';
import { registerUser } from '../../../services/apiUsers';

export function useRegisterUser() {
  const queryClient = useQueryClient();

  const {
    isLoading: isCreating,
    mutate: registerUserMt,
    data,
  } = useMutation({
    mutationFn: (user: IRequestAuthenticateUser) => registerUser(user),
    onSuccess: (data) => {
      if (!data.error) {
        toast.success(
          `Konto utworzone! Możesz się zalogować używając ${data.username} jako nazwa użytkownika`
        );
      }
      if (data.error) toast.error(`Coś poszło nie tak!`);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err: Error) => {
      toast.error(`Something went wrong ${err.message}`);
    },
  });

  return { isCreating, registerUserMt, data };
}

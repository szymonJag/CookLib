import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserRole } from '../../../services/apiUsers';
import { useUserContext } from '../../../contexts/UserContext';
import toast from 'react-hot-toast';

export function useChangeUserRole() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading, mutate: changeUserRoleMt } = useMutation(
    (userId: number) => changeUserRole(userId, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'],
        });
        toast.success('Zmieniono prawidłowo rolę użytkownika');
      },
      onError: (err: Error) => {
        console.log(`err`, err.message);
        toast.error(
          `Coś poszło nie tak, sprawdź console log po więcej informacji`
        );
      },
    }
  );

  return { isChanging: isLoading, changeUserRoleMt };
}

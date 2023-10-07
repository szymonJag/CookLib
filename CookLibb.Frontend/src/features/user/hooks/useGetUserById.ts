import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserById } from '../../../services/apiUsers';
import toast from 'react-hot-toast';

export function useGetUserById() {
  const queryClient = useQueryClient();

  const { mutate: getUserByIdMt } = useMutation({
    mutationFn: (id: number) => getUserById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err: Error) => {
      toast.error(`Something went wrong. ${err.message}`);
    },
  });

  return { getUserByIdMt };
}

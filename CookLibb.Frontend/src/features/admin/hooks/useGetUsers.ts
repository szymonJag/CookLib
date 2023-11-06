import { useQuery } from '@tanstack/react-query';
import { IUser } from '../../../interfaces/IUser';
import { getAllUsers } from '../../../services/apiUsers';
import { useUserContext } from '../../../contexts/UserContext';

export function useGetUsers(username: string = '') {
  const context = useUserContext();
  const token = context.token;
  const { isLoading, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(username, token),
  });

  const users: IUser[] = data;

  return { isLoading, users, error };
}

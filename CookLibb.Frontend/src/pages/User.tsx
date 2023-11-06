import { useQueryClient } from '@tanstack/react-query';
import UserPanel from '../features/user/components/UserPanel';
import { PageContent } from '../ui/PageContent';
import RouteHeading from '../ui/RouteHeading';

function User() {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: ['favourites', 'created'],
  });

  return (
    <>
      <RouteHeading text='Panel użytkownika' />
      <PageContent>
        <UserPanel />
      </PageContent>
    </>
  );
}

export default User;

import UserPanel from '../features/user/components/UserPanel';
import { PageContent } from '../ui/PageContent';
import RouteHeading from '../ui/RouteHeading';

function User() {
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

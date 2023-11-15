import { useUserContext } from '../contexts/UserContext';
import AdminLayout from '../features/admin/components/AdminPanel';
import Heading from '../ui/Heading';
import { PageContent } from '../ui/PageContent';
import RouteHeading from '../ui/RouteHeading';

function Admin() {
  const { user } = useUserContext();

  return (
    <>
      <RouteHeading text='Panel administratora' />
      <PageContent>
        {user ? (
          <AdminLayout />
        ) : (
          <Heading as='h1'>
            Musisz posiadać rolę administratora żeby przeglądać tę stronę
          </Heading>
        )}
      </PageContent>
    </>
  );
}

export default Admin;

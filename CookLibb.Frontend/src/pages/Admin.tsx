import AdminLayout from '../features/admin/AdminLayout';
import { PageContent } from '../ui/PageContent';
import RouteHeading from '../ui/RouteHeading';

function Admin() {
  return (
    <>
      <RouteHeading text='Panel administratora' />
      <PageContent>
        <AdminLayout />;
      </PageContent>
    </>
  );
}

export default Admin;

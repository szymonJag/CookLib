import SearchLayout from '../features/search/components/SearchLayout';
import { PageContent } from '../ui/PageContent';
import RouteHeading from '../ui/RouteHeading';

function Search() {
  return (
    <>
      <RouteHeading text='Szukaj przepisu' />
      <PageContent>
        <SearchLayout />
      </PageContent>
    </>
  );
}

export default Search;

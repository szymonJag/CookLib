import { PageSection } from '../../../ui/PageSection';
import Heading from '../../../ui/Heading';
import UserInformation from './UserInformation';
import FavouriteRecipesList from './FavouriteRecipes';
import CreatedRecipesList from './CreatedRecipes';
import { PanelLayout, PanelSection } from '../../../ui/SiteSections';

function UserPanel() {
  return (
    <PanelLayout>
      <PanelSection>
        <Heading as='h2'>Informacje</Heading>
        <PageSection>
          <UserInformation />
        </PageSection>
      </PanelSection>
      <PanelSection>
        <Heading as='h2'>Ulubione przepisy</Heading>
        <PageSection>
          <FavouriteRecipesList />
        </PageSection>
      </PanelSection>
      <PanelSection>
        <Heading as='h2'>Dodane przepisy</Heading>
        <PageSection>
          <CreatedRecipesList />
        </PageSection>
      </PanelSection>
    </PanelLayout>
  );
}

export default UserPanel;

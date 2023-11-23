import ProductsSection from './IngredientsSection';
import Heading from '../../../ui/Heading';
import { PanelLayout, PanelSection } from '../../../ui/SiteSections';
import UsersSection from './UsersSection';
import RecipesTable from '../../../ui/RecipesTable';
import { useGetAllRecipes } from '../hooks/useGetAllRecipes';
import { useEffect, useState } from 'react';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { RecipeStatus } from '../../../utils/constants';
import { useQueryClient } from '@tanstack/react-query';

function AdminLayout() {
  const queryClient = useQueryClient();
  const { recipes } = useGetAllRecipes();
  const [recipesState, setReciepesState] = useState<IShortRecipe[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (recipes) {
      setReciepesState(
        recipes &&
          recipes.sort((a, b) => {
            if (
              a.status === RecipeStatus.Oczekujący &&
              b.status !== RecipeStatus.Oczekujący
            ) {
              return -1;
            } else if (
              a.status !== RecipeStatus.Oczekujący &&
              b.status === RecipeStatus.Oczekujący
            ) {
              return 1;
            } else {
              return 0;
            }
          })
      );
    }
  }, [recipes]);
  queryClient.invalidateQueries({
    queryKey: ['admin-recipes'],
  });
  return (
    <PanelLayout>
      <PanelSection>
        <Heading as='h2'>Zarządzaj produktami</Heading>
        <ProductsSection />
      </PanelSection>

      <PanelSection>
        <Heading as='h2'>Zarządzaj przepisami</Heading>
        <RecipesTable recipes={recipesState} />
      </PanelSection>
      <PanelSection>
        <Heading as='h2'>Zarządzaj użytkownikami</Heading>
        <UsersSection />
      </PanelSection>
    </PanelLayout>
  );
}

export default AdminLayout;

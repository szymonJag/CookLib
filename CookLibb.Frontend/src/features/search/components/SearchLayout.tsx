import styled from 'styled-components';
import Heading from '../../../ui/Heading';
import { useIngredients } from '../../admin/hooks/Products/useGetIngredients';
import { useState, useEffect } from 'react';
import { IIngredient } from '../../../interfaces/IIngredient';
import Spinner from '../../../ui/Spinner';
import { IngredientTypes } from '../../../utils/constants';
import IngredientTypeSection from './IngredientTypeSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function SearchLayout() {
  const { ingredients, isLoading } = useIngredients();
  const [fetchedIngredients, setFetchedIngredients] = useState<IIngredient[]>(
    []
  );

  const ingredientTypes = IngredientTypes.slice(1);

  useEffect(() => {
    if (ingredients) {
      setFetchedIngredients(ingredients);
    }
  }, [ingredients]);

  console.log(fetchedIngredients);

  if (isLoading) <Spinner />;

  return (
    <Layout>
      <Heading as='h2'>Jakie produkty masz w lodówce?</Heading>
      {ingredientTypes.map((type) => {
        const ingredients = fetchedIngredients.filter(
          (ingr) => ingr.type.id === type.id
        );

        return (
          <IngredientTypeSection
            ingredients={ingredients}
            ingredientType={type.name}
            key={type.id}
          />
        );
      })}
    </Layout>
  );
}

export default SearchLayout;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecipesFilter from './RecipesFilter';
import RecipeCard from './RecipeCard';
import { useGetRecipes } from '../hooks/useGetShortRecipes';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Heading from '../../../ui/Heading';
import Spinner from '../../../ui/Spinner';

const RecipesListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RecipeCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
`;

function RecipesList() {
  const { recipes, isLoading } = useGetRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState<IShortRecipe[]>([]);

  console.log(recipes);

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      setFilteredRecipes(recipes);
    }
  }, [recipes]);

  return (
    <RecipesListLayout>
      <RecipesFilter />
      {isLoading ? (
        <Spinner />
      ) : (
        <RecipeCardList>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          ) : (
            <Heading as='h1'>Brak dostępnych przepisów</Heading>
          )}
        </RecipeCardList>
      )}
    </RecipesListLayout>
  );
}

export default RecipesList;

// RecipeInfo.tsx
import React from 'react';
import styled from 'styled-components';
import { IRecipe } from '../../../interfaces/IRecipe';

const RecipeInfoContainer = styled.div`
  margin-top: 1rem;
  cursor: pointer;
`;

interface RecipeInfoProps {
  recipe: IRecipe;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe }) => {
  return (
    <RecipeInfoContainer>
      <h2>{recipe.name}</h2>
      <p>Serving Size: {recipe.servingSize}</p>
      <p>Preparation Time: {recipe.preparationTime} minutes</p>
      {/* Dodaj więcej informacji o przepisie */}
    </RecipeInfoContainer>
  );
};

export default RecipeInfo;

// RecipeCard.tsx
import React from 'react';
import styled from 'styled-components';
import RecipeInfo from './RecipeInfo'; // Importujemy RecipeInfo
import { IShortRecipe } from '../../../interfaces/IRecipe';
import SliderComponent from '../../../ui/Slider';
import RecipeShortInfo from './RecipeShortInfo';

const RecipeCardContainer = styled.div`
  margin: 1rem;
  border: solid 1px var(--color-grey-200);

  display: flex;
  flex-direction: column;
  width: 27rem;
  height: 35rem;
  transition: 0.2s all;

  &:hover {
    transform: scale(101%);
    background-color: var(--color-grey-50);
  }
`;

interface RecipeCardProps {
  recipe: IShortRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  if (!recipe || !recipe.images || !Array.isArray(recipe.images)) {
    return null; // Return null or handle the error gracefully
  }
  const images = recipe.images;

  return (
    <RecipeCardContainer>
      <SliderComponent images={images} />
      <RecipeShortInfo recipe={recipe} />
      <RecipeInfo recipe={recipe} />
    </RecipeCardContainer>
  );
};

export default RecipeCard;
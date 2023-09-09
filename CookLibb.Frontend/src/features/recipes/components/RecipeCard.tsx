// RecipeCard.tsx
import React from 'react';
import styled from 'styled-components';
import RecipeInfo from './RecipeInfo'; // Importujemy RecipeInfo
import { IRecipe } from '../../../interfaces/IRecipe';
import SliderComponent from '../../../ui/Slider';

const RecipeCardContainer = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  width: 27rem;
  height: 30rem;
  transition: 0.5s all;

  &:hover {
    transform: scale(105%);
    background-color: #ccc;
  }
`;

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  if (!recipe || !recipe.images || !Array.isArray(recipe.images)) {
    return null; // Return null or handle the error gracefully
  }
  const images = recipe.images.map((img) => img.imagePath);

  return (
    <RecipeCardContainer>
      <SliderComponent images={images} />
      <RecipeInfo recipe={recipe} />
    </RecipeCardContainer>
  );
};

export default RecipeCard;

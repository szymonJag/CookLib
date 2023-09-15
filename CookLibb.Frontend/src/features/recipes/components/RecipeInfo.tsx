// RecipeInfo.tsx
import React from 'react';
import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';
import RecipeTags from './RecipeTags';
import RecipeIngredients from './RecipeIngredients';
import { Link } from 'react-router-dom';

const RecipeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  flex: 1;
`;

const ButtonLink = styled(Link)`
  align-self: flex-end;
`;

const CardButton = styled(Button)`
  margin-top: auto;
  width: max-content;
`;

const CardHeading = styled(Heading)`
  font-weight: 600;
`;

interface RecipeInfoProps {
  recipe: IShortRecipe;
  selectedRecipeTags: number[];
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({
  recipe,
  selectedRecipeTags,
}) => {
  return (
    <RecipeInfoContainer>
      <CardHeading as='h2'>{recipe.name}</CardHeading>
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipeTags
        tags={recipe.recipeTags}
        selectedRecipeTags={selectedRecipeTags}
      />
      <ButtonLink to={`${recipe.id}`}>
        <CardButton size='small'>Więcej</CardButton>
      </ButtonLink>
    </RecipeInfoContainer>
  );
};

export default RecipeInfo;

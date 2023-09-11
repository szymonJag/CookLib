// RecipeInfo.tsx
import React from 'react';
import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import Heading from '../../../ui/Heading';
import Button from '../../../ui/Button';
import RecipeTags from './RecipeTags';

const RecipeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1;
`;

const CardButton = styled(Button)`
  margin-top: auto;
  width: max-content;
  align-self: flex-end;
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
      <RecipeTags
        tags={recipe.recipeTags}
        selectedRecipeTags={selectedRecipeTags}
      />
      <CardButton size='small'>Więcej</CardButton>
    </RecipeInfoContainer>
  );
};

export default RecipeInfo;

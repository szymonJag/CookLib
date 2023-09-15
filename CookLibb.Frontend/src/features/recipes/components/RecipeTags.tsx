import styled from 'styled-components';
// import { useState } from 'react';
import { IRecipeTag } from '../../../interfaces/IRecipe';

const RecipeTagsLayout = styled.div`
  margin-top: auto;
`;

// const RecipeTagHeading = styled.span`
//   font-weight: 400;
// `;

interface RecipeTagItemProps {
  isSelected: boolean;
}

const RecipeTagItem = styled.span<RecipeTagItemProps>`
  /* font-weight: 500 */
  font-weight: ${(props) => (props.isSelected ? 700 : 300)};
  font-size: 1.3rem;
`;

interface RecipeTagsProps {
  tags: IRecipeTag[];
  selectedRecipeTags: number[];
}

function RecipeTags({ tags, selectedRecipeTags }: RecipeTagsProps) {
  return (
    <RecipeTagsLayout>
      {/* <RecipeTagHeading>Tagi: </RecipeTagHeading> */}
      {tags.map((tag, index) => (
        <RecipeTagItem
          isSelected={selectedRecipeTags.includes(tag.tagId) ? true : false}
        >
          {tag.name}
          {index < tags.length - 1 && ', '}
        </RecipeTagItem>
      ))}
    </RecipeTagsLayout>
  );
}

export default RecipeTags;

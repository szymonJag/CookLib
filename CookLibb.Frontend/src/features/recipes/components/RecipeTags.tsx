import styled from 'styled-components';
import { IRecipeTag } from '../../../interfaces/IRecipe';

const RecipeTagsLayout = styled.div`
  margin-top: auto;
`;

// const RecipeTagHeading = styled.span`
//   font-weight: 400;
// `;

const RecipeTagItem = styled.span`
  font-weight: 300;
`;

interface RecipeTagsProps {
  tags: IRecipeTag[];
}

function RecipeTags({ tags }: RecipeTagsProps) {
  return (
    <RecipeTagsLayout>
      {/* <RecipeTagHeading>Tagi: </RecipeTagHeading> */}
      {tags.map((tag, index) => (
        <RecipeTagItem>
          {tag.name}
          {index < tags.length - 1 && ', '}
        </RecipeTagItem>
      ))}
    </RecipeTagsLayout>
  );
}

export default RecipeTags;

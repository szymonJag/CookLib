import styled from 'styled-components';
import { IRecipeTag } from '../../../interfaces/IRecipe';

const RecipeTagsLayout = styled.div`
  margin-top: auto;
`;

interface RecipeTagItemProps {
  isSelected: boolean;
}

const RecipeTagItem = styled.span<RecipeTagItemProps>`
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
      {tags.map((tag, index) => (
        <RecipeTagItem
          isSelected={selectedRecipeTags.includes(tag.tagId)}
          key={tag.id}
        >
          {tag.name}
          {index < tags.length - 1 && ', '}
        </RecipeTagItem>
      ))}
    </RecipeTagsLayout>
  );
}

export default RecipeTags;

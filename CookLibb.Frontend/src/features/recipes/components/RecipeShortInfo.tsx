import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { BiTimeFive } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
const RecipeShortInfoLayout = styled.div`
  padding: 0.5rem 1em;
  border-bottom: solid 1px var(--color-grey-200);
  background-color: var(--color-grey-200);
  display: flex;
  justify-content: space-between;
`;

const RecipeInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface RecipeShortInfoProps {
  recipe: IShortRecipe;
}

function RecipeShortInfo({ recipe }: RecipeShortInfoProps) {
  console.log(recipe);
  return (
    <RecipeShortInfoLayout>
      <RecipeInfoItem>
        <AiOutlineHeart />
      </RecipeInfoItem>
      <RecipeInfoItem>
        <BiTimeFive />
        <span>{recipe.preparationTime} min</span>
      </RecipeInfoItem>
      <RecipeInfoItem>
        <BsPeople />
        <span>{recipe.servingSize}</span>
      </RecipeInfoItem>
    </RecipeShortInfoLayout>
  );
}

export default RecipeShortInfo;

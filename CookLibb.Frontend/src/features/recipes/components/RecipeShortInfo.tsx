import styled from 'styled-components';
import { IShortRecipe } from '../../../interfaces/IRecipe';
import { BiTimeFive } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

interface RecipeShortInfoLayoutProps {
  showText?: boolean;
}

const RecipeShortInfoLayout = styled.div<RecipeShortInfoLayoutProps>`
  background-color: var(--color-grey-50);
  display: flex;
  border: 1px solid var(--color-grey-300);

  border-top: none;

  & > *:not(:last-child) {
    border-right: ${({ showText }) =>
      showText ? '1px solid var(--color-grey-300)' : 'none'};
  }
`;

const RecipeInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;
  padding: 0.5rem;
`;

const RecipeInfoItemFavourite = styled(RecipeInfoItem)`
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-300);
  }
`;

interface RecipeShortInfoProps {
  recipe: IShortRecipe;
  showText?: boolean;
}

function RecipeShortInfo({ recipe, showText = false }: RecipeShortInfoProps) {
  return (
    <RecipeShortInfoLayout showText={showText}>
      <RecipeInfoItemFavourite>
        <AiOutlineHeart />
        {showText && <span>Dodaj do ulubionych</span>}
      </RecipeInfoItemFavourite>
      <RecipeInfoItem>
        <BiTimeFive />
        {showText && <span>Czas przygotowania</span>}
        <span>{recipe.preparationTime} min</span>
      </RecipeInfoItem>
      <RecipeInfoItem>
        <BsPeople />
        {showText && <span>Porcja dla osób</span>}
        <span>{recipe.servingSize}</span>
      </RecipeInfoItem>
    </RecipeShortInfoLayout>
  );
}

export default RecipeShortInfo;

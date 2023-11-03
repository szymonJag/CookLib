import styled from 'styled-components';
import { IRecipeShortInfo } from '../../../interfaces/IRecipe';
import { BiTimeFive } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useUserContext } from '../../../contexts/UserContext';
import { useAddFavouriteRecipe } from '../hooks/useAddFavouriteRecipe';
import Button from '../../../ui/Button';

interface RecipeShortInfoLayoutProps {
  showText?: boolean;
  color?: string;
}

const RecipeShortInfoLayout = styled.div<RecipeShortInfoLayoutProps>`
  /* background-color: ${(props) => props.color}; */
  background-color: ${({ color }) =>
    color ? 'var(--color-grey-300)' : 'none'};
  padding: 0.5rem;
  display: flex;
  border: 1px solid var(--color-grey-300);

  & > *:not(:last-child) {
    border-right: ${({ showText }) =>
      showText ? '1px solid var(--color-grey-300)' : 'none'};
  }
`;

const RecipeInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  flex: 1;
`;

const FavouriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;
  padding: 0.5rem;
  border: none;
  background-color: transparent;

  &:hover {
    background-color: var(--color-grey-300);
  }
  &:active &:focus {
    border: none;
    outline: 12px solid blue;
  }
`;

interface RecipeShortInfoProps {
  recipe: IRecipeShortInfo;
  showText?: boolean;
  handleAddServings?: () => void;
  handleRemoveServings?: () => void;
}

function RecipeShortInfo({
  recipe,
  showText = false,
  handleAddServings,
  handleRemoveServings,
}: RecipeShortInfoProps) {
  const userContext = useUserContext();
  const { addFavouriteRecipeMt, isAdding } = useAddFavouriteRecipe();
  const isUserLogged = userContext.user === null;
  const isFavourite = userContext.user?.favouritesRecipesId.includes(recipe.id);

  const isDisabled = isUserLogged || isAdding;

  const handleAddFavourite = () => {
    addFavouriteRecipeMt(recipe.id);
    userContext.toggleFavouriteRecipe(recipe.id);
  };

  return (
    <RecipeShortInfoLayout showText={showText}>
      <FavouriteButton disabled={isDisabled} onClick={handleAddFavourite}>
        {isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}
        {showText && <span>Dodaj do ulubionych</span>}
      </FavouriteButton>
      <RecipeInfoItem>
        <BiTimeFive />
        {showText && <span>Czas przygotowania</span>}
        <span>{recipe.preparationTime} min</span>
      </RecipeInfoItem>
      <RecipeInfoItem>
        <BsPeople />
        {showText && <span>Porcja dla osób</span>}
        {showText && (
          <Button
            size='small'
            disabled={recipe.servingSize === 1}
            onClick={handleRemoveServings}
          >
            -
          </Button>
        )}
        <span>{recipe.servingSize}</span>
        {showText && (
          <Button size='small' onClick={handleAddServings}>
            +
          </Button>
        )}
      </RecipeInfoItem>
    </RecipeShortInfoLayout>
  );
}

export default RecipeShortInfo;

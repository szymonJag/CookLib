import styled from 'styled-components';
import { IRecipe, IRecipeShortInfo } from '../../../interfaces/IRecipe';
import SliderComponent from '../../../ui/Slider';
import RecipePanelIngredients from './RecipePanelIngredients';
import RecipeShortInfo from '../../recipes/components/RecipeShortInfo';
import { mapRecipeToShortRecipe } from '../../../utils/mappers';
import RecipeStep from './RecipePreparationStep';
import StarsRating from '../../../ui/StarsRating';
import RecipeCommentsSection from './RecipeCommentsSection';
import { useState } from 'react';
import { IRecipeIngredient } from '../../../interfaces/IIngredient';
import Button from '../../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { RecipeStatus, UserRoles } from '../../../utils/constants';
import RecipeStatusSelect from './RecipeStatusSelect';
import { useUserContext } from '../../../contexts/UserContext';
import { useChangeRecipeStatus } from '../hooks/useChangeRecipeStatus';
import { useQueryClient } from '@tanstack/react-query';

const RecipePanelLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RecipeStatusSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const RecipePanelWelcome = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 40rem;
  gap: 1rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-300);
`;

const RecipePanelNavigation = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RecipePanelSlider = styled(SliderComponent)`
  border-radius: 1rem;
`;

interface RecipePanelProps {
  recipe: IRecipe;
}

function RecipePanel({ recipe }: RecipePanelProps) {
  const recipeImages = recipe.images.map((img) => img.imagePath);
  const [recipeIngredients, setRecipeIngredients] = useState<
    IRecipeIngredient[]
  >(recipe.ingredients);
  const [shortRecipe, setShortRecipe] = useState<IRecipeShortInfo>(
    mapRecipeToShortRecipe(recipe)
  );
  const [servingSize, setServingSize] = useState(shortRecipe.servingSize);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<RecipeStatus>(
    recipe.status
  );
  const userContext = useUserContext();
  const isUserAdmin = userContext.user?.role === UserRoles.Admin;
  const { isChanging, changeRecipeStatusMt } = useChangeRecipeStatus();
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: ['recipe'],
  });

  const handleStatusChange = (status: RecipeStatus) => {
    setSelectedStatus(status);
  };

  const handleSaveRecipeStatusChange = () => {
    changeRecipeStatusMt({ recipeId: recipe.id, newStatus: selectedStatus });
  };

  const handleAddServings = () => {
    setServingSize((prevServingSize) => prevServingSize + 1);
    setRecipeIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) => ({
        ...ingredient,
        amount: (ingredient.amount / servingSize) * (servingSize + 1),
      }))
    );
    setShortRecipe((prev) => {
      return {
        ...prev,
        servingSize: prev.servingSize + 1,
      };
    });
  };

  const handleRemoveServings = () => {
    setServingSize((prevServingSize) => prevServingSize - 1);
    setRecipeIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) => ({
        ...ingredient,
        amount: (ingredient.amount / servingSize) * (servingSize - 1),
      }))
    );
    setShortRecipe((prev) => {
      return {
        ...prev,
        servingSize: prev.servingSize - 1,
      };
    });
    setRecipeIngredients((prev) => prev);
  };

  return (
    <RecipePanelLayout>
      <RecipePanelNavigation>
        <Button size='small' variation='secondary' onClick={() => navigate(-1)}>
          Wróć
        </Button>
        {isUserAdmin && (
          <RecipeStatusSection>
            <span>Zmień status</span>
            <RecipeStatusSelect
              value={selectedStatus}
              onChange={handleStatusChange}
            />
            <Button
              size='small'
              variation='secondary'
              disabled={isChanging || recipe.status === selectedStatus}
              onClick={handleSaveRecipeStatusChange}
            >
              Zapisz
            </Button>
          </RecipeStatusSection>
        )}

        <Button size='small' onClick={() => navigate('/recipes')}>
          Strona główna
        </Button>
      </RecipePanelNavigation>
      <div>
        <RecipePanelWelcome>
          <RecipePanelSlider images={recipeImages} height='100%' />
          <RecipePanelIngredients ingredients={recipeIngredients} />
        </RecipePanelWelcome>
        <RecipeShortInfo
          recipe={shortRecipe}
          showText={true}
          handleAddServings={handleAddServings}
          handleRemoveServings={handleRemoveServings}
        />
      </div>
      <StarsRating handleRatingClick={() => console.log('elo')} />
      <RecipeStep steps={recipe.preparationSteps} />
      <RecipeCommentsSection recipe={recipe} />
    </RecipePanelLayout>
  );
}

export default RecipePanel;

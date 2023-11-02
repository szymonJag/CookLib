import styled from 'styled-components';
import { IRecipe } from '../../../interfaces/IRecipe';
import SliderComponent from '../../../ui/Slider';
import RecipePanelIngredients from './RecipePanelIngredients';
import RecipeShortInfo from '../../recipes/components/RecipeShortInfo';
import { mapRecipeToShortRecipe } from '../../../utils/mappers';
import RecipeStep from './RecipePreparationStep';
import StarsRating from '../../../ui/StarsRating';
import RecipeCommentsSection from './RecipeCommentsSection';

const RecipePanelLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const RecipePanelWelcome = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 40rem;
  gap: 1rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-300);
`;

const RecipePanelSlider = styled(SliderComponent)`
  border-radius: 1rem;
`;

interface RecipePanelProps {
  recipe: IRecipe;
}

function RecipePanel({ recipe }: RecipePanelProps) {
  const recipeImages = recipe.images.map((img) => img.imagePath);
  const recipeIngredients = recipe.ingredients;

  return (
    <RecipePanelLayout>
      <div>
        <RecipePanelWelcome>
          <RecipePanelSlider images={recipeImages} height='100%' />
          <RecipePanelIngredients ingredients={recipeIngredients} />
        </RecipePanelWelcome>
        <RecipeShortInfo
          recipe={mapRecipeToShortRecipe(recipe)}
          showText={true}
        />
      </div>
      <StarsRating handleRatingClick={() => console.log('elo')} />
      <RecipeStep steps={recipe.preparationSteps} />
      <RecipeCommentsSection recipe={recipe} />
    </RecipePanelLayout>
  );
}

export default RecipePanel;

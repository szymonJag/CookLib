import { IRecipe, IShortRecipe } from '../interfaces/IRecipe';

export function mapRecipeToShortRecipe(recipe: IRecipe): IShortRecipe {
  const shortRecipe: IShortRecipe = {
    id: recipe.id,
    name: recipe.name,
    servingSize: recipe.servingSize,
    preparationTime: recipe.preparationTime,
    images: recipe.images.map((image) => image.imagePath),
    recipeTags: recipe.recipeTags,
    ingredients: recipe.ingredients.map((ingredient) => ingredient.name),
  };

  return shortRecipe;
}

using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices;
public interface IHandlerHelpers
{
    void AddRecipeIngredientsToDb(List<RecipeIngredientRequestDTO> recipeIngredients, int recipeId);
    void DeleteRecipeIngredientsFromDb(List<RecipeIngredient> recipeIngredients);
    void AddRecipePreparationStepsToDb(List<PreparationStepRequestDTO> preparationSteps, int recipeId);
    void DeleteRecipePreparationStepsFromDb(List<PreparationStep> preparationSteps);

    void AddRecipeTagsToDb(List<int> recipeTags, int recipeId);
    void DeleteRecipeTagsFromDb(List<RecipeTag> recipeTags);
}

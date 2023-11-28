using CookLib.ApplicationServices.API.Domain.Models;

namespace CookLib.ApplicationServices;
public interface IHandlerHelpers
{
    void AddIngredientsToDb(List<RecipeIngredientRequestDTO> recipeIngredients, int recipeId);
}

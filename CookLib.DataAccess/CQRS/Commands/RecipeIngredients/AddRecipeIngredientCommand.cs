using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.RecipeIngredients
{
    public class AddRecipeIngredientCommand : CommandBase<RecipeIngredient, RecipeIngredient>
    {
        public override async Task<RecipeIngredient> Execute(CookLibContext context)
        {
            await context.RecipeIngredients.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

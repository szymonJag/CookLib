using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.RecipeIngredients
{
    public class AddRecipeIngredientCommand : CommandBase<RecipeIngredient, RecipeIngredient>
    {
        public override async Task<RecipeIngredient> Execute(CookLibContext context)
        {
            context.RecipeIngredients.AsNoTracking();
            await context.RecipeIngredients.AddAsync(this.Parameter);

            return this.Parameter;
        }
    }
}

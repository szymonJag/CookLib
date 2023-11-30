using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.RecipeIngredients
{
    public class DeleteRecipeIngredientByIdCommand : CommandBase<RecipeIngredient, RecipeIngredient>
    {
        public override async Task<RecipeIngredient> Execute(CookLibContext context)
        {
            context.RecipeIngredients.AsNoTracking();
            context.RecipeIngredients.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

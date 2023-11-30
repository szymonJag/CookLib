using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.RecipeTags
{
    public class AddRecipeTagCommand : CommandBase<RecipeTag, RecipeTag>
    {
        public override async Task<RecipeTag> Execute(CookLibContext context)
        {
            context.PreparationSteps.AsNoTracking();
            await context.RecipeTags.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

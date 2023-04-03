using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.RecipeTags
{
    public class AddRecipeTagCommand : CommandBase<RecipeTag, RecipeTag>
    {
        public override async Task<RecipeTag> Execute(CookLibContext context)
        {
            await context.RecipeTags.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

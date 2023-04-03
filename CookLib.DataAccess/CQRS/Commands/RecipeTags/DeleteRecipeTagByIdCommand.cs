using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.RecipeTags
{
    public class DeleteRecipeTagByIdCommand : CommandBase<RecipeTag, RecipeTag>
    {
        public override async Task<RecipeTag> Execute(CookLibContext context)
        {
            context.RecipeTags.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess;

public class UpdateRecipeStatusCommand : CommandBase<Recipe, Recipe>
{
    public override async Task<Recipe> Execute(CookLibContext context)
    {
        context.Recipes.Update(this.Parameter);
        await context.SaveChangesAsync();
        return this.Parameter;
    }
}

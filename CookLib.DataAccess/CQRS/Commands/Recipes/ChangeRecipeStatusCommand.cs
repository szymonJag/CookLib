using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess;

public class ChangeRecipeStatusCommand : CommandBase<ChangeRecipeStatusModel, ChangeRecipeStatusModel>
{
    public override async Task<ChangeRecipeStatusModel> Execute(CookLibContext context)
    {
        var recipeToChange = await context.Recipes.FirstOrDefaultAsync(x => x.Id == this.Parameter.RecipeId);
        recipeToChange.Status = this.Parameter.NewRecipeStatus;
        context.Recipes.Update(recipeToChange);
        await context.SaveChangesAsync();
        return this.Parameter;
    }
}


public class ChangeRecipeStatusModel
{
    public int RecipeId { get; set; }
    public RecipeStatus NewRecipeStatus { get; set; }
}
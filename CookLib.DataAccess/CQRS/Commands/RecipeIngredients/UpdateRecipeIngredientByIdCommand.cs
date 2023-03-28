using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.RecipeIngredients
{
    public class UpdateRecipeIngredientByIdCommand : CommandBase<RecipeIngredient, RecipeIngredient>
    {
        public override async Task<RecipeIngredient> Execute(CookLibContext context)
        {
            context.RecipeIngredients.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }

    }
}

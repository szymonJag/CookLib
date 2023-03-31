using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.Ingredients
{
    public class UpdateIngredientByIdCommand : CommandBase<Ingredient, Ingredient>
    {
        public override async Task<Ingredient> Execute(CookLibContext context)
        {
            context.ChangeTracker.Clear();
            context.Ingredients.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

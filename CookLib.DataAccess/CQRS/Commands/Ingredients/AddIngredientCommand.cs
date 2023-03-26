using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.Ingredients
{
    public class AddIngredientCommand : CommandBase<Ingredient, Ingredient>
    {
        public override async Task<Ingredient> Execute(CookLibContext context)
        {
            await context.Ingredients.AddAsync(this.Parameter);
            await context.SaveChangesAsync();

            return this.Parameter;
        }
    }
}

using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.Ingredients
{
    public class DeleteIngredientByIdCommand : CommandBase<Ingredient, Ingredient>
    {
        public override async Task<Ingredient> Execute(CookLibContext context)
        {
            context.Ingredients.Remove(this.Parameter);
            await context.SaveChangesAsync();

            return this.Parameter;
        }
    }
}

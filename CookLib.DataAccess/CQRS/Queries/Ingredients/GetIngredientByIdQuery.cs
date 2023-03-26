using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Ingredients
{
    public class GetIngredientByIdQuery : QueryBase<Ingredient>
    {
        public int Id { get; set; }

        public override async Task<Ingredient> Execute(CookLibContext context)
        {
            var ingredient = await context.Ingredients.FirstOrDefaultAsync(x => x.Id == Id);

            return ingredient;
        }
    }
}

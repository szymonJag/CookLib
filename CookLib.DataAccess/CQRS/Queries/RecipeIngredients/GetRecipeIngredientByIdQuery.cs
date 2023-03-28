using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.RecipeIngredients
{
    public class GetRecipeIngredientByIdQuery : QueryBase<RecipeIngredient>
    {
        public int Id { get; set; }
        public override async Task<RecipeIngredient> Execute(CookLibContext context)
        {
            var recipeIngredient = await context.RecipeIngredients.FirstOrDefaultAsync(x => x.Id == Id);
            return recipeIngredient;
        }
    }
}

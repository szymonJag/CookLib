using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.RecipeIngredients
{
    public class GetAllIngredientByRecipeIdQuery : QueryBase<List<RecipeIngredient>>
    {
        public int Id { get; set; }
        public override async Task<List<RecipeIngredient>> Execute(CookLibContext context)
        {
            var recipeIngredients = await context.RecipeIngredients
                .Where(x => x.RecipeId == Id)
                .Include(x => x.Ingredient)
                .AsNoTracking()
                .ToListAsync();

            return recipeIngredients;
        }
    }
}


using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Recipes
{
    public class GetRecipesByIngredientsIdQuery : QueryBase<List<Recipe>>
    {
        List<int> ingredientsId;
        public override async Task<List<Recipe>> Execute(CookLibContext context)
        {
            var recipes = await context.Recipes
                .Include(x => x.Ingredients)
                    .ThenInclude(x => x.Ingredient)
                .Include(x => x.PreparationSteps)
                .Include(x => x.Comments)
                    .ThenInclude(x => x.Author)
                .Include(x => x.RecipeTags)
                    .ThenInclude(x => x.Tag)
                .Include(x => x.Author)
                .AsNoTracking()
                .Where(x => x.Ingredients.Any(z => ingredientsId.Contains(z.IngredientId))).ToListAsync();

            return recipes;
        }
    }
}

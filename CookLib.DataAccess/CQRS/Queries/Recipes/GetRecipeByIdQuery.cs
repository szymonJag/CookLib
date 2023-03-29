using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Recipes
{
    public class GetRecipeByIdQuery : QueryBase<Recipe>
    {
        public int Id { get; set; }
        public override Task<Recipe> Execute(CookLibContext context)
        {
            return context.Recipes
                .Include(x => x.Ingredients)
                    .ThenInclude(x => x.Ingredient)
                .Include(x => x.Ingredients)
                .Include(x => x.PreparationSteps)
                .Include(x => x.Comments)
                    .ThenInclude(x => x.Author)
                .Include(x => x.RecipeTags)
                    .ThenInclude(x => x.Tag)
                .Include(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}

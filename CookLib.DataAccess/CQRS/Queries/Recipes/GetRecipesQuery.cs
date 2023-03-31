using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Recipes
{
    public class GetRecipesQuery : QueryBase<List<Recipe>>
    {
        public string Name { get; set; }
        public override async Task<List<Recipe>> Execute(CookLibContext context)
        {
            var recipes = context.Recipes
                          .Include(x => x.Ingredients)
                            .ThenInclude(x => x.Ingredient)
                          .Include(x => x.Ingredients)
                          .Include(x => x.PreparationSteps.OrderBy(x => x.Step))
                          .Include(x => x.Comments)
                            .ThenInclude(x => x.Author)
                          .Include(x => x.RecipeTags)
                            .ThenInclude(x => x.Tag)
                          .Include(x => x.Author)
                          .AsNoTracking()
                          .ToList();

            return string.IsNullOrEmpty(this.Name) ?
                                  recipes.ToList() :
                                  recipes.Where(x => x.Name.ToLower().Contains(this.Name.ToLower())).ToList();
        }
    }
}

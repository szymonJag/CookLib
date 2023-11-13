using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Recipes
{
  public class GetShortRecipesQuery : QueryBase<List<Recipe>>
  {
    public string Name { get; set; }
    public RecipeStatus Status { get; set; }
    public override async Task<List<Recipe>> Execute(CookLibContext context)
    {
      var recipes = await context.Recipes
                    .Include(x => x.RecipeTags)
                      .ThenInclude(x => x.Tag)
                    .Include(x => x.Images)
                    .Include(x => x.Ingredients)
                      .ThenInclude(x => x.Ingredient)
                    .AsNoTracking()
                    .ToListAsync();

      return string.IsNullOrEmpty(this.Name) ?
                            recipes.ToList() :
                            recipes.Where(x => x.Name.ToLower().Contains(this.Name.ToLower())).ToList();
    }
  }
}

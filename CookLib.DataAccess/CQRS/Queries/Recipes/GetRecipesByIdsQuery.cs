using System.Data.Common;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess;
public class GetRecipesByIdsQuery : QueryBase<List<Recipe>>
{
    public List<int> Ids { get; set; }

    public override Task<List<Recipe>> Execute(CookLibContext context)
    {
        var recipes = context.Recipes
            .Include(x => x.Ingredients)
                .ThenInclude(x => x.Ingredient)
            .Include(x => x.PreparationSteps)
            .Include(x => x.Comments)
                .ThenInclude(x => x.Author)
            .Include(x => x.RecipeTags)
                .ThenInclude(x => x.Tag)
            .Include(x => x.Author)
            .Include(x => x.Images)
            .AsNoTracking()
            .Where(x => Ids.Contains(x.Id))
            .ToListAsync();

        return recipes;
    }
}



using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.RecipeTags
{
    public class GetRecipeTagsByRecipeIdQuery : QueryBase<List<RecipeTag>>
    {
        public int Id { get; set; }
        public override async Task<List<RecipeTag>> Execute(CookLibContext context)
        {
            return await context.RecipeTags.Where(x => x.Id == Id).ToListAsync();
        }
    }
}

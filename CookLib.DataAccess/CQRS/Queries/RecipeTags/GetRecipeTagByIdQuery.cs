using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.RecipeTags
{
    public class GetRecipeTagByIdQuery : QueryBase<RecipeTag>
    {
        public int Id { get; set; }
        public override async Task<RecipeTag> Execute(CookLibContext context)
        {
            return await context.RecipeTags.FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}

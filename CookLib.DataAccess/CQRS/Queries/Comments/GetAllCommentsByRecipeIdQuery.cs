using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Comments
{
    public class GetAllCommentsByRecipeIdQuery : QueryBase<List<Comment>>
    {
        public int RecipeId { get; set; }
        public override async Task<List<Comment>> Execute(CookLibContext context)
        {
            return await context.Comments
                                    .Include(x => x.Author)
                                .Where(x => x.RecipeId == RecipeId)
                                .AsNoTracking()
                                .ToListAsync();
        }
    }
}

using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Comments
{
    public class GetCommentByIdQuery : QueryBase<Comment>
    {
        public int Id { get; set; }
        public override async Task<Comment> Execute(CookLibContext context)
        {
            return await context.Comments.FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}

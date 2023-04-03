using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Tags
{
    public class GetTagByIdQuery : QueryBase<Tag>
    {
        public int Id { get; set; }

        public override Task<Tag> Execute(CookLibContext context)
        {
            return context.Tags.FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}

using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Tags
{
    public class GetTagsQuery : QueryBase<List<Tag>>
    {
        public string Name { get; set; }

        public override async Task<List<Tag>> Execute(CookLibContext context)
        {
            return string.IsNullOrEmpty(this.Name) ?
               await context.Tags
               .AsNoTracking()
               .ToListAsync() :
               await context.Tags
               .Where(x => x.Name.ToLower()
               .Contains(this.Name.ToLower()))
               .AsNoTracking()
               .ToListAsync();
        }
    }
}

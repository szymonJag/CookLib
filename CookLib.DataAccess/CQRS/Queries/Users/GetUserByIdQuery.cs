using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Users
{
    public class GetUserByIdQuery : QueryBase<Entities.User>
    {
        public int Id { get; set; }
        public override Task<User> Execute(CookLibContext context)
        {
            return context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}

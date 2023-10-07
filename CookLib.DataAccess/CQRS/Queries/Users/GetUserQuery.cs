using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Users
{
    public class GetUserQuery : QueryBase<User>
    {
        public string Name { get; set; }
        public override Task<User> Execute(CookLibContext context)
        {
            return context.Users.Include(x => x.Favourites).AsNoTracking().FirstOrDefaultAsync(x => x.Username == Name);
        }
    }
}

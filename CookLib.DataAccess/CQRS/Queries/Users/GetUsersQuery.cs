using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Users
{
    public class GetUsersQuery : QueryBase<List<User>>
    {
        public string Username { get; set; }
        public override async Task<List<User>> Execute(CookLibContext context)
        {
            return string.IsNullOrEmpty(this.Username) ?
                await context.Users.AsNoTracking().ToListAsync() :
                await context.Users.Where(x => x.Username.ToLower().Contains(this.Username.ToLower())).AsNoTracking().ToListAsync();
        }
    }
}

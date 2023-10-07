using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Users
{
    public class GetUserByEmailQuery : QueryBase<User>
    {
        public string Name { get; set; }
        public override async Task<User> Execute(CookLibContext context)
        {
            return await context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Mail == Name);
        }
    }
}

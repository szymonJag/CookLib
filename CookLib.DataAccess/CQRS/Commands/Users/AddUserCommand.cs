
namespace CookLib.DataAccess.CQRS.Commands.User
{
    public class AddUserCommand : CommandBase<Entities.User, Entities.User>
    {
        public override async Task<Entities.User> Execute(CookLibContext context)
        {
            await context.Users.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

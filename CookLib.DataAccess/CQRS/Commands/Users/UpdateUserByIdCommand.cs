namespace CookLib.DataAccess.CQRS.Commands.Users
{
    public class UpdateUserByIdCommand : CommandBase<Entities.User, Entities.User>
    {
        public override async Task<Entities.User> Execute(CookLibContext context)
        {
            context.Users.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

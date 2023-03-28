namespace CookLib.DataAccess.CQRS.Commands.User
{
    public class DeleteUserByIdCommand : CommandBase<Entities.User, Entities.User>
    {
        public override async Task<Entities.User> Execute(CookLibContext context)
        {
            context.Users.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

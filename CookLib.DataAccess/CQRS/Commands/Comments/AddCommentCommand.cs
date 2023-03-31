using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.Comments
{
    public class AddCommentCommand : CommandBase<Comment, Comment>
    {
        public override async Task<Comment> Execute(CookLibContext context)
        {
            await context.Comments.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

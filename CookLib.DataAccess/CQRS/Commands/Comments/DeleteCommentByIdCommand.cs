using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.Comments
{
    public class DeleteCommentByIdCommand : CommandBase<Comment, Comment>
    {
        public override async Task<Comment> Execute(CookLibContext context)
        {
            context.Comments.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

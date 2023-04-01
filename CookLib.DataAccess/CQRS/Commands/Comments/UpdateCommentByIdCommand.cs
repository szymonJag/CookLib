using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.Comments
{
    public class UpdateCommentByIdCommand : CommandBase<Comment, Comment>
    {
        public override async Task<Comment> Execute(CookLibContext context)
        {
            context.Comments.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Comments
{
    public class AddCommentRequest : RequestBase, IRequest<AddCommentResponse>
    {
        public int RecipeId { get; set; }
        public int AuthorId { get; set; }
        public string Description { get; set; }
    }
}

using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Comments
{
    public class UpdateCommentByIdRequest : IRequest<UpdateCommentByIdResponse>
    {
        public int Id;
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public int AuthorId { get; set; }
        public int RecipeId { get; set; }
    }
}

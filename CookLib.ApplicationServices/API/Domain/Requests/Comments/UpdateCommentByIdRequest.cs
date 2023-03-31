using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Comments
{
    public class UpdateCommentByIdRequest : IRequest<UpdateCommentByIdResponse>
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}

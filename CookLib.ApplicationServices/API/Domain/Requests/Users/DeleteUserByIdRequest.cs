using CookLib.ApplicationServices.API.Domain.Responses.User;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.User
{
    public class DeleteUserByIdRequest : RequestBase, IRequest<DeleteUserByIdResponse>
    {
        public int Id { get; set; }
    }
}

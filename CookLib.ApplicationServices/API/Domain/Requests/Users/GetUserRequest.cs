using CookLib.ApplicationServices.API.Domain.Responses.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Users
{
    public class GetUserRequest : RequestBase, IRequest<GetUserResponse>
    {
        public string Username { get; set; }
    }
}

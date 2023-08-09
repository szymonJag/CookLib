using CookLib.ApplicationServices.API.Domain.Responses.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Users
{
    public class AuthenticateUserRequest : RequestBase, IRequest<AuthenticateUserResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

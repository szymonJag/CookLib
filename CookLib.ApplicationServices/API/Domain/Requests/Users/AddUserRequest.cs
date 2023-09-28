using CookLib.ApplicationServices.API.Domain.Responses.User;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.User
{
    public class AddUserRequest : RequestBase, IRequest<AddUserResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}

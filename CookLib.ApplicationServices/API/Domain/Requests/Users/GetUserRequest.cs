using CookLib.ApplicationServices.API.Domain.Responses.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Users
{
    public class GetUserRequest : IRequest<GetUserResponse>
    {
        public string Name { get; set; }
    }
}

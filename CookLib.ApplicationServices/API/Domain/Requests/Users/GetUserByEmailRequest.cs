using CookLib.ApplicationServices.API.Domain.Responses.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Users
{
    public class GetUserByEmailRequest : RequestBase, IRequest<GetUserByEmailResponse>
    {
        public string Email { get; set; }
    }
}

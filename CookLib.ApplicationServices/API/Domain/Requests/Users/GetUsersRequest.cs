using CookLib.ApplicationServices.API.Domain.Responses.User;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.User
{
    public class GetUsersRequest : RequestBase, IRequest<GetUsersResponse>
    {
        public string Username { get; set; }
    }
}

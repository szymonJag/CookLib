using CookLib.ApplicationServices.API.Domain.Requests;
using MediatR;

namespace CookLib.ApplicationServices;
public class ChangeUserRoleRequest : RequestBase, IRequest<ChangeUserRoleResponse>
{
    public int UserId { get; set; }
}

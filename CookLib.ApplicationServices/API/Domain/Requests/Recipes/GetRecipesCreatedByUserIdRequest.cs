using CookLib.ApplicationServices.API.Domain.Requests;
using MediatR;

namespace CookLib.ApplicationServices;
public class GetRecipesCreatedByUserIdRequest : RequestBase, IRequest<GetRecipesCreatedByUserIdResponse>
{
    public int Id { get; set; }
}

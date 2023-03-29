using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class DeleteRecipeByIdRequest : IRequest<DeleteRecipeByIdResponse>
    {
    }
}

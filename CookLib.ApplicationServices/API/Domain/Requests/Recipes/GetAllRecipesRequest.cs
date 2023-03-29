using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class GetAllRecipesRequest : IRequest<GetAllRecipesResponse>
    {
        public string Name { get; set; }
    }
}

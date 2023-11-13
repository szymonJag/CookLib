using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class GetAllRecipesRequest : RequestBase, IRequest<GetAllRecipesResponse>
    {
        public RecipeStatus Status { get; set; }
        public string Name { get; set; }
    }
}

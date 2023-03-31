using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class GetRecipesByIngredientsIdRequest : IRequest<GetRecipesByIngredientsIdResponse>
    {
        public List<int> IngredientsId1 { get; set; }
    }
}

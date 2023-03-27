using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredient
{
    public class GetAllIngredientsByRecipeIdRequest : IRequest<GetAllIngredientsByRecipeIdResponse>
    {
        public int Id { get; set; }
    }
}

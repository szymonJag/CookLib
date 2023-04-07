using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients
{
    public class DeleteRecipeIngredientByIdRequest : RequestBase, IRequest<DeleteRecipeIngredientByIdResponse>
    {
        public int Id { get; set; }
    }
}

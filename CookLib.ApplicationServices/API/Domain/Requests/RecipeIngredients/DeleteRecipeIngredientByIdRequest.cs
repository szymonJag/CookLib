using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients
{
    public class DeleteRecipeIngredientsByIdRequest : IRequest<DeleteRecipeIngredientsByIdResponse>
    {
        public int Id { get; set; }
    }
}

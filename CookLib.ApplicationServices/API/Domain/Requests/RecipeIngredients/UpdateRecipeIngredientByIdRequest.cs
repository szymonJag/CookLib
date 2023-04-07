using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients
{
    public class UpdateRecipeIngredientByIdRequest : RequestBase, IRequest<UpdateRecipeIngredientByIdResponse>
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public int IngredientId { get; set; }
        public int Amount { get; set; }
        public Measurement Measurement { get; set; }
    }
}

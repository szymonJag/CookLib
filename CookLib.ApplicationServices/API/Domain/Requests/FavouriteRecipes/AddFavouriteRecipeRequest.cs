using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes
{
    public class AddFavouriteRecipeRequest : IRequest<AddFavouriteRecipeResponse>
    {
        public int UserId { get; set; }
        public int RecipeId { get; set; }
    }
}

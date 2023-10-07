using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes
{
    public class ToggleFavouriteRecipeRequest : RequestBase, IRequest<ToggleFavouriteRecipeResponse>
    {
        public int RecipeId { get; set; }
    }
}

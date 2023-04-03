using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes
{
    public class UpdateFavouriteRecipeByIdRequest : IRequest<UpdateFavouriteRecipeByIdResponse>
    {
        public int Id;
        public int RecipeId { get; set; }
        public int UserId { get; set; }
    }
}

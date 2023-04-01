using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes
{
    public class DeleteFavouriteRecipeByIdRequest : IRequest<DeleteFavouriteRecipeByIdResponse>
    {
        public int Id { get; set; }
    }
}

using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes
{
    public class GetAllFavouriteRecipesByUserIdRequest : RequestBase, IRequest<GetAllFavouriteRecipesByUserIdResponse>
    {
        public int Id { get; set; }
    }
}

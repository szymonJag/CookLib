using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.RecipeTags
{
    public class AddRecipeTagRequest : RequestBase, IRequest<AddRecipeTagResponse>
    {
        public int TagId { get; set; }
        public int RecipeId { get; set; }
    }
}

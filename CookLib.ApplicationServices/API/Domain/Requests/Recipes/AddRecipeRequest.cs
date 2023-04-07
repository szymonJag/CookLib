using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class AddRecipeRequest : RequestBase, IRequest<AddRecipeResponse>
    {
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int ServingSize { get; set; }
        public int AuthorId { get; set; }
    }
}

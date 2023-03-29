using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class UpdateRecipeByIdRequest : IRequest<UpdateRecipeByIdResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int ServingSize { get; set; }
    }
}

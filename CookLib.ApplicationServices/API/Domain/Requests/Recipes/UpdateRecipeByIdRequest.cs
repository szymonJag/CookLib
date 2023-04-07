using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class UpdateRecipeByIdRequest : RequestBase, IRequest<UpdateRecipeByIdResponse>
    {
        public int Id;
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int ServingSize { get; set; }

        public DateTime CreationDate { get; set; }
        public int AuthorId { get; set; }
    }
}

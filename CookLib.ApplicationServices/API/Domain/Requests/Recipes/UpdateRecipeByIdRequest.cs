using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class UpdateRecipeByIdRequest : RequestBase, IRequest<UpdateRecipeByIdResponse>
    {
        public int Id;
        public int AuthorId { get; set; }
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int ServingSize { get; set; }
        public List<RecipeIngredientRequestDTO> Ingredients { get; set; }
        public List<PreparationStepRequestDTO> PreparationSteps { get; set; }
        public List<int> RecipeTags { get; set; }
    }
}

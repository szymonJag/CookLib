using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class RecipeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ServingSize { get; set; }
        public int PreparationTime { get; set; }
        public string CreateDate { get; set; }
        public List<RecipeIngredientDTO> Ingredients { get; set; }
        public List<PreparationStepDTO> PreparationSteps { get; set; }
        public List<CommentDTO> Comments { get; set; }
        public List<RecipeTagDTO> RecipeTags { get; set; }
        public List<Image> Images { get; set; }
        public AuthorDTO Author { get; set; }
    }
}

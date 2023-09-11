namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class ShortRecipeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ServingSize { get; set; }
        public int PreparationTime { get; set; }
        public List<string> Images { get; set; }
        public List<RecipeTagDTO> RecipeTags { get; set; }

    }
}

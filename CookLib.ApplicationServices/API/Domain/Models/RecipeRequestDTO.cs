namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class RecipeRequestDTO
    {
        public int AuthorId { get; set; }
        public string Name { get; set; }
        public int PreparationTime { get; set; }
        public int ServingSize { get; set; }
        public DateTime CreateDate { get; set; }
    }
}

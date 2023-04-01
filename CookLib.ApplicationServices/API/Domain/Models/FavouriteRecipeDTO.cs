namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class FavouriteRecipeDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RecipeId { get; set; }
    }
}

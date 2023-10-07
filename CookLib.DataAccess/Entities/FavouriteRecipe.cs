using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class FavouriteRecipe : EntityBase
    {
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class FavouriteRecipe : EntityBase
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int RecipeId { get; set; }
    }
}

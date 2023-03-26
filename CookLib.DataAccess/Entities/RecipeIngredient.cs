using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class RecipeIngredient : EntityBase
    {
        [Required]
        [Range(1, 9999,
        ErrorMessage = "Range of amount should be between 1 and 9999")]
        public int Amount { get; set; }
        [Required]
        public Measurement Measurement { get; set; }
        [Required]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
        [Required]
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
    }
}

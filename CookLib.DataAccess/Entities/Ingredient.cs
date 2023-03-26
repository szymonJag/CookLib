using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class Ingredient : EntityBase
    {
        [Required]
        [MaxLength(30, ErrorMessage = "Name can have only 30 characters")]
        public string Name { get; set; }
        [Required]
        [Range(1, 9999, ErrorMessage = "Range of Kcal should be between 1 and 9999")]
        public int Kcal { get; set; }
        [Required]
        public IngredientType Type { get; set; }
    }
}

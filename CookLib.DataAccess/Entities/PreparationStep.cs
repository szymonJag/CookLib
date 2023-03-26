using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class PreparationStep : EntityBase
    {
        [Required]
        public int Step { get; set; }
        [Required]
        [MaxLength(500, ErrorMessage = "Descripton should be not longer than 500 characters")]
        public string Description { get; set; }

        [Required]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}

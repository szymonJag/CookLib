using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class Recipe : EntityBase
    {
        [Required]
        [StringLength(maximumLength: 60, MinimumLength = 4,
        ErrorMessage = "Name should contain between 4 and 60 characters")]
        public string Name { get; set; }
        [Required]
        [Range(1, 999,
        ErrorMessage = "Preparation time should be in range 1 and 999")]
        public int PreparationTime { get; set; }
        [Required]
        [Range(1, 999, ErrorMessage = "Serving size should be higher then 0")]
        public int ServingSize { get; set; }
        public DateTime CreateDate { get; set; }

        public List<RecipeIngredient> Ingredients { get; set; } = new List<RecipeIngredient>();
        public List<PreparationStep> PreparationSteps { get; set; } = new List<PreparationStep>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();
        [Required]

        public int UserId { get; set; }
        public User User { get; set; }

    }
}

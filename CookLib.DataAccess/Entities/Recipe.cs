using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [Required]
        public DateTime CreateDate { get; set; }

        public List<RecipeIngredient> Ingredients { get; set; } = new List<RecipeIngredient>();
        public List<PreparationStep> PreparationSteps { get; set; } = new List<PreparationStep>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<RecipeTag> RecipeTags { get; set; } = new List<RecipeTag>();
        public List<FavouriteRecipe> UsersFavourite { get; set; } = new List<FavouriteRecipe>();
        public List<Image> Images { get; set; }

        [Required]
        [ForeignKey("Author")]
        public int AuthorId { get; set; }
        public User Author { get; set; }

    }
}

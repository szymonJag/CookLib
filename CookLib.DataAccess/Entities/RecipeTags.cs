using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class RecipeTags : EntityBase
    {
        [Required]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }

        [Required]
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }


}

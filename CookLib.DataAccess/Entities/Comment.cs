using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class Comment : EntityBase
    {
        [Required]
        [MaxLength(300, ErrorMessage = "Comment can't be longer then 300 characters")]
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }

        [Required]
        public int UserId { get; set; }
        public User Author { get; set; }

        [Required]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}

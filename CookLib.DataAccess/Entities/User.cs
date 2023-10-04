using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class User : EntityBase
    {
        [Required]
        [EmailAddress]
        public string Mail { get; set; }

        [Required]
        [StringLength(maximumLength: 20, MinimumLength = 4,
        ErrorMessage = "Login should be between 4 and 20 characters")]
        public string Username { get; set; }

        [Required]
        public string HashedPassword { get; set; }

        [Required]
        public string Salt { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }
        public string AvatarURL { get; set; }

        [Required]
        public UserRole Role { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Recipe> Recipes { get; set; }
        public List<FavoriteRecipe> Favorites { get; set; }

    }

}

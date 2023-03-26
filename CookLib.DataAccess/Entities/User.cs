using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class User : EntityBase
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(maximumLength: 20, MinimumLength = 6,
        ErrorMessage = "Password should be between 6 and 20 characters")]
        public string Password { get; set; }

        [Required]
        [StringLength(maximumLength: 20, MinimumLength = 4,
        ErrorMessage = "Login should be between 4 and 20 characters")]
        public string Login { get; set; }

        public UserRole Role { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Recipe> Recipes { get; set; }
        public List<FavouriteRecipe> Favourites { get; set; }

    }

}

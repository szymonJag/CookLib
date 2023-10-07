using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Mail { get; set; }
        public string CreationDate { get; set; }
        public UserRole Role { get; set; }
        public string AvatarURL { get; set; }
        public List<int> FavouritesRecipesId { get; set; }
    }
}

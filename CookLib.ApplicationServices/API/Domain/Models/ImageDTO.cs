namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public string ImageBase64 { get; set; }
    }

}

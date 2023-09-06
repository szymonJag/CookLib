namespace CookLib.DataAccess.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public byte[] ImageContent { get; set; }

    }
}

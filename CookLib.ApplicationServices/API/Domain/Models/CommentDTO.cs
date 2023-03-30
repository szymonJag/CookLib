namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public AuthorDTO Author { get; set; }
        public string Description { get; set; }
    }
}

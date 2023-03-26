using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{
    public class EntityBase
    {
        [Key]
        public int Id { get; set; }
    }
}

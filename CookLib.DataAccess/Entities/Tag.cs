using System.ComponentModel.DataAnnotations;

namespace CookLib.DataAccess.Entities
{

    public class Tag : EntityBase
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 1,
        ErrorMessage = "Range of tag should be between 1 and 50 characters")]
        public string Name { get; set; }
    }



}

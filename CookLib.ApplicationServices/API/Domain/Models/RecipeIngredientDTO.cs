using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class RecipeIngredientDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Kcal { get; set; }
        public int Amount { get; set; }
        public Measurement Measurement { get; set; }
        public IngredientType Type { get; set; }
    }
}

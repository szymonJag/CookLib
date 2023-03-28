namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class RecipeIngredientDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Kcal { get; set; }
        public int Amount { get; set; }
        public string Measurement { get; set; }
        public string Type { get; set; }
    }
}

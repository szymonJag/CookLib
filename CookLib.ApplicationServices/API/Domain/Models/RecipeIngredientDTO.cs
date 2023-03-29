namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class RecipeIngredientDTO
    {
        public IngredientDTO Ingredient { get; set; }
        public int Amount { get; set; }
        public string Measurement { get; set; }
    }
}

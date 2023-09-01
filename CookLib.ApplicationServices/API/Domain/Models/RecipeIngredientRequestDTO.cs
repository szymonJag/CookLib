namespace CookLib.ApplicationServices.API.Domain.Models
{
    public class RecipeIngredientRequestDTO
    {
        public int IngredientId { get; set; }
        public int Amount { get; set; }
        public int MeasurementTypeId { get; set; }
    }
}

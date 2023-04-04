using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.RecipeIngredients
{
    public class AddRecipeIngredientValidator : AbstractValidator<AddRecipeIngredientRequest>
    {
        public AddRecipeIngredientValidator()
        {
            RuleFor(x => x.IngredientId).NotEmpty();
            RuleFor(x => x.RecipeId).NotEmpty();
            RuleFor(x => x.Amount).InclusiveBetween(1, 9999);
            RuleFor(x => x.Measurement).IsInEnum();
        }
    }
}

using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Ingredients
{
    public class AddIngredientRequestValidator : AbstractValidator<AddIngredientRequest>
    {
        public AddIngredientRequestValidator()
        {
            RuleFor(x => x.Kcal).InclusiveBetween(1, 9999);
            RuleFor(x => x.Name).Length(1, 30);
            RuleFor(x => x.Type).IsInEnum();
        }
    }
}

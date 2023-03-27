using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Validators
{
    public class AddIngredientRequestValidator : AbstractValidator<AddIngredientRequest>
    {
        public AddIngredientRequestValidator()
        {
            this.RuleFor(x => x.Kcal).InclusiveBetween(1, 999);
        }
    }
}

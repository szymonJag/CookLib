using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Ingredients
{
    public class UpdateIngredientRequestValidator : AbstractValidator<UpdateIngredientByIdRequest>
    {
        public UpdateIngredientRequestValidator()
        {
            RuleFor(x => x.Kcal).InclusiveBetween(1, 9999);
            RuleFor(x => x.Name).Length(1, 30);
            RuleFor(x => x.Type).IsInEnum();
        }
    }
}

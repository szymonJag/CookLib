using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Recipes
{
    public class UpdateRecipeRequestValidator : AbstractValidator<UpdateRecipeByIdRequest>
    {
        public UpdateRecipeRequestValidator()
        {
            RuleFor(x => x.Name).Length(4, 60);
            RuleFor(x => x.PreparationTime).InclusiveBetween(1, 999);
            RuleFor(x => x.ServingSize).InclusiveBetween(1, 999);
        }
    }
}

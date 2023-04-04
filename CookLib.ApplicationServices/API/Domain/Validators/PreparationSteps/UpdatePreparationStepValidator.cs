using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.PreparationSteps
{
    public class UpdatePreparationStepValidator : AbstractValidator<UpdatePreparationStepByIdRequest>
    {
        public UpdatePreparationStepValidator()
        {
            RuleFor(x => x.Step).GreaterThan(0);
            RuleFor(x => x.Description).Length(0, 500);
            RuleFor(x => x.RecipeId).NotEmpty();
        }
    }
}

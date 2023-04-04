using CookLib.ApplicationServices.API.Domain.Requests.RecipeTags;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.RecipeTags
{
    public class AddRecipeTagValidator : AbstractValidator<AddRecipeTagRequest>
    {
        public AddRecipeTagValidator()
        {
            RuleFor(x => x.TagId).NotEmpty();
            RuleFor(x => x.RecipeId).NotEmpty();
        }
    }
}

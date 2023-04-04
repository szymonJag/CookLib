using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.FavouriteRecipes
{
    public class AddFavouriteRecipeValidator : AbstractValidator<AddFavouriteRecipeRequest>
    {
        public AddFavouriteRecipeValidator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.RecipeId).NotEmpty();
        }
    }
}

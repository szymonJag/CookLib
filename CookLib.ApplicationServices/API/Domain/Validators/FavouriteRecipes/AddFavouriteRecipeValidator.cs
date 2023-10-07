using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.FavouriteRecipes
{
    public class AddFavouriteRecipeValidator : AbstractValidator<ToggleFavouriteRecipeRequest>
    {
        public AddFavouriteRecipeValidator()
        {
            RuleFor(x => x.RecipeId).NotEmpty();
        }
    }
}

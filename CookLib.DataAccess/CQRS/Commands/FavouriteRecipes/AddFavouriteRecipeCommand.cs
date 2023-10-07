using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.FavouriteRecipes
{
    public class AddFavouriteRecipeCommand : CommandBase<FavouriteRecipe, FavouriteRecipe>
    {
        public override async Task<FavouriteRecipe> Execute(CookLibContext context)
        {
            await context.FavouriteRecipes.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

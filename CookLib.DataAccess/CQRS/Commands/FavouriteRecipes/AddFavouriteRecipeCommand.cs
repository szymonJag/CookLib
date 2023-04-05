using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.FavouriteRecipes
{
    public class AddFavouriteRecipeCommand : CommandBase<FavoriteRecipe, FavoriteRecipe>
    {
        public override async Task<FavoriteRecipe> Execute(CookLibContext context)
        {
            await context.FavouriteRecipes.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

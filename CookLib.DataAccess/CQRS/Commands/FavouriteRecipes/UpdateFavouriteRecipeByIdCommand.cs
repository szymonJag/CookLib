using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.FavouriteRecipes
{
    public class UpdateFavouriteRecipeByIdCommand : CommandBase<FavoriteRecipe, FavoriteRecipe>
    {
        public override async Task<FavoriteRecipe> Execute(CookLibContext context)
        {
            context.FavouriteRecipes.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

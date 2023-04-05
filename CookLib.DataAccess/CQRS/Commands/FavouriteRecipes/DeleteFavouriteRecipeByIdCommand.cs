using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.FavouriteRecipes
{
    public class DeleteFavouriteRecipeByIdCommand : CommandBase<FavoriteRecipe, FavoriteRecipe>
    {
        public override async Task<FavoriteRecipe> Execute(CookLibContext context)
        {
            context.FavouriteRecipes.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

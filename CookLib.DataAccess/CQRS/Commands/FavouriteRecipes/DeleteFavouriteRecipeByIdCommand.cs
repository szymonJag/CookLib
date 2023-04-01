using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.FavouriteRecipes
{
    public class DeleteFavouriteRecipeByIdCommand : CommandBase<FavouriteRecipe, FavouriteRecipe>
    {
        public override async Task<FavouriteRecipe> Execute(CookLibContext context)
        {
            context.FavouriteRecipes.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

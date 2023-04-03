using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.FavouriteRecipes
{
    public class UpdateFavouriteRecipeByIdCommand : CommandBase<FavouriteRecipe, FavouriteRecipe>
    {
        public override async Task<FavouriteRecipe> Execute(CookLibContext context)
        {
            context.FavouriteRecipes.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

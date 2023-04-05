using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.FavouriteRecipes
{
    public class GetAllFavouriteRecipesByUserIdQuery : QueryBase<List<FavoriteRecipe>>
    {
        public int Id { get; set; }
        public override async Task<List<FavoriteRecipe>> Execute(CookLibContext context)
        {
            return await context.FavouriteRecipes
                .AsNoTracking()
                .Where(x => x.RecipeId == Id)
                .ToListAsync();
        }
    }
}

using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.FavouriteRecipes
{
    public class GetAllFavouriteRecipesByUserIdQuery : QueryBase<List<FavouriteRecipe>>
    {
        public int Id { get; set; }
        public override async Task<List<FavouriteRecipe>> Execute(CookLibContext context)
        {
            var favourites = await context.FavouriteRecipes
                .AsNoTracking()
                .Where(x => x.UserId == Id)
                .ToListAsync();

            return favourites;
        }
    }
}

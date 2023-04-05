using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.FavouriteRecipes
{

    public class GetFavouriteRecipeByIdQuery : QueryBase<FavoriteRecipe>
    {
        public int Id { get; set; }
        public override Task<FavoriteRecipe> Execute(CookLibContext context)
        {
            return context.FavouriteRecipes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}

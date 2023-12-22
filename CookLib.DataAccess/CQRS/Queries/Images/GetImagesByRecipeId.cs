using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess;

public class GetImagesByRecipeId : QueryBase<List<Image>>
{
    public int RecipeId { get; set; }
    public override async Task<List<Image>> Execute(CookLibContext context)
    {
        return await context.Images.Where(x => x.RecipeId == RecipeId).ToListAsync();
    }
}

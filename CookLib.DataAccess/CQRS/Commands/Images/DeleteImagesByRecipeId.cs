using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess;

public class DeleteImagesByRecipeIdCommand : CommandBase<int, List<Image>>
{


    public override async Task<List<Image>> Execute(CookLibContext context)
    {

        var imagesToDelete = await context.Images.Where(x => x.RecipeId == this.Parameter).ToListAsync();
        context.Images.RemoveRange(imagesToDelete);
        await context.SaveChangesAsync();

        return imagesToDelete;
    }
}

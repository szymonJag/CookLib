using System.Security.Cryptography.X509Certificates;
using CookLib.DataAccess.CQRS.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace CookLib.DataAccess;
public class GetRecipesCreatedByUserIdQuery : QueryBase<List<int>>
{
    public int UserId { get; set; }
    public override async Task<List<int>> Execute(CookLibContext context)
    {
        var recipesId = await context.Recipes.Where(x => x.AuthorId == UserId).Select(x => x.Id).ToListAsync();

        return recipesId;
    }
}

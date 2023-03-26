using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Ingredients
{
    public class GetIngredientsQuery : QueryBase<List<Ingredient>>
    {
        public string Name { get; set; }
        public override async Task<List<Ingredient>> Execute(CookLibContext context)
        {
            return string.IsNullOrEmpty(this.Name) ?
                await context.Ingredients.ToListAsync() :
                await context.Ingredients.Where(x => x.Name.ToLower().Contains(this.Name.ToLower())).ToListAsync();
        }
    }
}

using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Queries.Recipes
{
    public class GetRecipesByIngredientsId : QueryBase<List<Recipe>>
    {
        public override Task<List<Recipe>> Execute(CookLibContext context)
        {
            throw new NotImplementedException();
        }
    }
}

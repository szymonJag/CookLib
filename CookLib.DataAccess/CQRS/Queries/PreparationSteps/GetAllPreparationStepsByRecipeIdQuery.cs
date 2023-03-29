using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.PreparationSteps
{
    public class GetAllPreparationStepsByRecipeIdQuery : QueryBase<List<PreparationStep>>
    {
        public int Id { get; set; }
        public override Task<List<PreparationStep>> Execute(CookLibContext context)
        {
            return context.PreparationSteps.Where(x => x.RecipeId == Id).ToListAsync();
        }
    }
}

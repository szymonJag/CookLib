using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.PreparationSteps
{
    public class GetPreparationStepByIdQuery : QueryBase<PreparationStep>
    {
        public int Id { get; set; }
        public override async Task<PreparationStep> Execute(CookLibContext context)
        {
            return await context.PreparationSteps
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}

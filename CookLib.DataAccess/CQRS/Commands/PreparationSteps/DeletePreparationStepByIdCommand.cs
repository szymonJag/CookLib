using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.PreparationSteps
{
    public class DeletePreparationStepByIdCommand : CommandBase<PreparationStep, PreparationStep>
    {
        public override async Task<PreparationStep> Execute(CookLibContext context)
        {
            context.PreparationSteps.AsNoTracking();
            context.PreparationSteps.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

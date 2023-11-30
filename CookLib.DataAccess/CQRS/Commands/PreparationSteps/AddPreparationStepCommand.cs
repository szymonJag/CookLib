using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.PreparationSteps
{
    public class AddPreparationStepCommand : CommandBase<PreparationStep, PreparationStep>
    {
        public override async Task<PreparationStep> Execute(CookLibContext context)
        {
            context.PreparationSteps.AsNoTracking();
            await context.PreparationSteps.AddAsync(this.Parameter);
            context.SaveChanges();
            return this.Parameter;
        }
    }
}

using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.PreparationSteps
{
    public class AddPreparationStepCommand : CommandBase<PreparationStep, PreparationStep>
    {
        public override async Task<PreparationStep> Execute(CookLibContext context)
        {
            await context.PreparationSteps.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

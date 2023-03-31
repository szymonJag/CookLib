using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.PreparationSteps
{
    public class UpdatePreparationStepByIdCommand : CommandBase<PreparationStep, PreparationStep>
    {
        public override async Task<PreparationStep> Execute(CookLibContext context)
        {
            context.ChangeTracker.Clear();
            context.PreparationSteps.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.PreparationSteps
{
    public class DeletePreparationStepByIdCommand : CommandBase<PreparationStep, PreparationStep>
    {
        public override async Task<PreparationStep> Execute(CookLibContext context)
        {
            context.PreparationSteps.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.PreparationSteps
{
    public class UpdatePreparationStepsOrderCommand : CommandBase<int, List<PreparationStep>>
    {
        public override async Task<List<PreparationStep>> Execute(CookLibContext context)
        {
            var recipeId = this.Parameter;

            var recipePreparationSteps = await context.PreparationSteps
                .Where(x => x.RecipeId == recipeId)
                .ToListAsync();

            var newOrder = recipePreparationSteps
                .Select((current, i) => new PreparationStep
                {
                    Id = current.Id,
                    RecipeId = current.RecipeId,
                    Description = current.Description,
                    Step = i + 1
                })
                .ToList();

            foreach (var item in newOrder)
            {
                var existing = context.PreparationSteps.Local.FirstOrDefault(e => e.Id == item.Id);

                if (existing != null)
                {
                    context.Entry(existing).State = EntityState.Detached;
                }
                context.PreparationSteps.Attach(item);
                context.Entry(item).State = EntityState.Modified;
            }

            await context.SaveChangesAsync();

            return newOrder;
        }
    }
}

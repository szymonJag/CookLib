using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.Recipes
{
    public class UpdateRecipeByIdCommand : CommandBase<Entities.Recipe, Entities.Recipe>
    {
        public override async Task<Entities.Recipe> Execute(CookLibContext context)
        {
            var parameter = this.Parameter;
            var recipe = await context.Recipes.AsNoTracking().FirstOrDefaultAsync(r => r.Id == parameter.Id);
            if (recipe != null)
            {
                context.Entry(recipe).CurrentValues.SetValues(parameter);
                await context.SaveChangesAsync();
                return this.Parameter;
            }

            context.Recipes.Update(parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

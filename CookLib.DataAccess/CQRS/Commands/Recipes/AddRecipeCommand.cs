namespace CookLib.DataAccess.CQRS.Commands.Recipe
{
    public class AddRecipeCommand : CommandBase<Entities.Recipe, Entities.Recipe>
    {
        public override async Task<Entities.Recipe> Execute(CookLibContext context)
        {
            await context.Recipes.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

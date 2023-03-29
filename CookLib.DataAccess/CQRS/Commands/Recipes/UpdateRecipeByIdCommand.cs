namespace CookLib.DataAccess.CQRS.Commands.Recipes
{
    public class UpdateRecipeByIdCommand : CommandBase<Entities.Recipe, Entities.Recipe>
    {
        public override async Task<Entities.Recipe> Execute(CookLibContext context)
        {
            context.Recipes.Update(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

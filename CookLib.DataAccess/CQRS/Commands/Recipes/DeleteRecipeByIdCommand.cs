namespace CookLib.DataAccess.CQRS.Commands.Recipes
{
    public class DeleteRecipeByIdCommand : CommandBase<Entities.Recipe, Entities.Recipe>
    {
        public override async Task<Entities.Recipe> Execute(CookLibContext context)
        {
            context.Recipes.Remove(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }
    }
}

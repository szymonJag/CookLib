namespace CookLib.DataAccess.CQRS.Commands.Recipes
{
    public class UpdateRecipeByIdCommand : CommandBase<Entities.Recipe, Entities.Recipe>
    {
        public override async Task<Entities.Recipe> Execute(CookLibContext context)
        {
            var par = this.Parameter;

            context.Recipes.Update(par);
            await context.SaveChangesAsync();
            return par;
        }
    }
}

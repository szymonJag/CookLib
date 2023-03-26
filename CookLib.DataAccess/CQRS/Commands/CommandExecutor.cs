namespace CookLib.DataAccess.CQRS.Commands
{
    public class CommandExecutor : ICommandExecutor
    {
        private readonly CookLibContext context;
        public CommandExecutor(CookLibContext context)
        {
            this.context = context;
        }

        public Task<TResult> Execute<TParameters, TResult>(CommandBase<TParameters, TResult> command)
        {
            return command.Execute(this.context);
        }
    }
}

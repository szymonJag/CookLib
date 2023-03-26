namespace CookLib.DataAccess.CQRS.Queries
{
    public class QueryExecutor : IQueryExecutor
    {
        private readonly CookLibContext context;

        public QueryExecutor(CookLibContext context)
        {
            this.context = context;
        }

        public Task<TResult> Execute<TResult>(QueryBase<TResult> query)
        {
            return query.Execute(this.context);
        }
    }
}

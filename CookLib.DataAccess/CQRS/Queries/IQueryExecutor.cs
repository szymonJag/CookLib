namespace CookLib.DataAccess.CQRS.Queries
{

    public interface IQueryExecutor
    {
        Task<TResult> Execute<TResult>(QueryBase<TResult> query);
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Recipes
{
    public class GetRecipesHandler : IRequestHandler<GetAllRecipesRequest, GetAllRecipesResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetRecipesHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetAllRecipesResponse> Handle(GetAllRecipesRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipesQuery() { Name = request.Name, Status = request.Status };
            var recipes = await this.queryExecutor.Execute(query);

            if (recipes == null)
            {
                return new GetAllRecipesResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetAllRecipesResponse()
            {
                Data = this.mapper.Map<List<RecipeDTO>>(recipes)
            };
        }
    }
}

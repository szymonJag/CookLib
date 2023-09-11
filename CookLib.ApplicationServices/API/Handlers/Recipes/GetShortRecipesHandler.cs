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
    public class GetShortRecipesHandler : IRequestHandler<GetAllShortRecipesRequest, GetAllShortRecipesResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetShortRecipesHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }

        public async Task<GetAllShortRecipesResponse> Handle(GetAllShortRecipesRequest request, CancellationToken cancellationToken)
        {
            var query = new GetShortRecipesQuery() { Name = request.Name };
            var recipes = await this.queryExecutor.Execute(query);

            if (recipes == null)
            {
                return new GetAllShortRecipesResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetAllShortRecipesResponse()
            {
                Data = this.mapper.Map<List<ShortRecipeDTO>>(recipes)
            };
        }
    }
}

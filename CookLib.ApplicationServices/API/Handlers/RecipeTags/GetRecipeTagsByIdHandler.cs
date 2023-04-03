using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeTags;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.RecipeTags;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeTags
{
    public class GetRecipeTagsByIdHandler : IRequestHandler<GetRecipeTagsByIdRequest, GetRecipeTagsByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetRecipeTagsByIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetRecipeTagsByIdResponse> Handle(GetRecipeTagsByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeTagsByIdQuery() { Id = request.Id };
            var recipeTags = await this.queryExecutor.Execute(query);

            if (recipeTags == null)
            {
                return new GetRecipeTagsByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetRecipeTagsByIdResponse()
            {
                Data = this.mapper.Map<List<RecipeTagDTO>>(query)
            };
        }
    }
}

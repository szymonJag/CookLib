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
    public class GetRecipeTagsByRecipeIdHandler : IRequestHandler<GetRecipeTagsByRecipeIdRequest, GetRecipeTagsByRecipeIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetRecipeTagsByRecipeIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetRecipeTagsByRecipeIdResponse> Handle(GetRecipeTagsByRecipeIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeTagsByRecipeIdQuery() { Id = request.Id };
            var recipeTags = await this.queryExecutor.Execute(query);

            if (recipeTags == null)
            {
                return new GetRecipeTagsByRecipeIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetRecipeTagsByRecipeIdResponse()
            {
                Data = this.mapper.Map<List<RecipeTagDTO>>(query)
            };
        }
    }
}

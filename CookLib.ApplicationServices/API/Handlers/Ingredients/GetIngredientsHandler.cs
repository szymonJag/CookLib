using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Ingredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Ingredients
{
    public class GetIngredientsHandler : IRequestHandler<GetIngredientsRequest, GetIngredientsResponse>
    {
        private readonly IQueryExecutor queryExecutor;
        private readonly IMapper mapper;

        public GetIngredientsHandler(IQueryExecutor queryExecutor, IMapper mapper)
        {
            this.queryExecutor = queryExecutor;
            this.mapper = mapper;
        }

        public async Task<GetIngredientsResponse> Handle(GetIngredientsRequest request, CancellationToken cancellationToken)
        {
            var query = new GetIngredientsQuery()
            {
                Name = request.Name
            };
            var ingredients = await queryExecutor.Execute(query);

            if (ingredients == null)
            {
                return new GetIngredientsResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var mappedIngredients = mapper.Map<List<IngredientDTO>>(ingredients);
            var response = new GetIngredientsResponse()
            {
                Data = mappedIngredients.ToList()
            };

            return response;
        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Ingredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Ingredients
{
    public class GetIngredientByIdHandler : IRequestHandler<GetIngredientByIdRequest, GetIngredientByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetIngredientByIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }

        public async Task<GetIngredientByIdResponse> Handle(GetIngredientByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetIngredientByIdQuery() { Id = request.Id };
            var ingredient = await this.queryExecutor.Execute(query);
            var mappedIngredient = this.mapper.Map<IngredientDTO>(ingredient);
            var response = new GetIngredientByIdResponse()
            {
                Data = mappedIngredient
            };

            return response;
        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredient;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.RecipeIngredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeIngredients
{
    public class GetAllIngredientsByRecipeIdHandler : IRequestHandler<GetAllIngredientsByRecipeIdRequest, GetAllIngredientsByRecipeIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetAllIngredientsByRecipeIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetAllIngredientsByRecipeIdResponse> Handle(GetAllIngredientsByRecipeIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetAllIngredientByRecipeIdQuery() { Id = request.Id };
            var recipeIngredients = await this.queryExecutor.Execute(query);

            if (!recipeIngredients.Any())
            {
                return new GetAllIngredientsByRecipeIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetAllIngredientsByRecipeIdResponse()
            {
                Data = this.mapper.Map<List<RecipeIngredientDTO>>(recipeIngredients)
            };
        }
    }

}

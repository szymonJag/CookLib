using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.PreparationSteps;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.PreparationSteps
{
    public class GetAllPreparationStepsByRecipeIdHandler : IRequestHandler<GetAllPreparationStepsByRecipeIdRequest, GetAllPreparationStepsByRecipeIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetAllPreparationStepsByRecipeIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetAllPreparationStepsByRecipeIdResponse> Handle(GetAllPreparationStepsByRecipeIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetAllPreparationStepsByRecipeIdQuery() { Id = request.Id };
            var steps = await this.queryExecutor.Execute(query);

            if (steps == null)
            {
                return new GetAllPreparationStepsByRecipeIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetAllPreparationStepsByRecipeIdResponse()
            {
                Data = this.mapper.Map<List<PreparationStepDTO>>(steps)
            };
        }
    }
}

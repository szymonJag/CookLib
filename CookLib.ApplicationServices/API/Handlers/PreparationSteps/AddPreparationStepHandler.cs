using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.PreparationSteps;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.PreparationSteps
{
    public class AddPreparationStepHandler : IRequestHandler<AddPreparationStepRequest, AddPreparationStepResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IQueryExecutor queryExecutor;

        public AddPreparationStepHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.queryExecutor = queryExecutor;
        }
        public async Task<AddPreparationStepResponse> Handle(AddPreparationStepRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeByIdQuery() { Id = request.RecipeId };
            var recipeAuthorId = (await this.queryExecutor.Execute(query)).AuthorId;
            var prepStep = this.mapper.Map<PreparationStep>(request);

            if (request.AuthenticatedUserId != recipeAuthorId)
            {
                return new AddPreparationStepResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new AddPreparationStepCommand() { Parameter = prepStep };
            var addedPrepStep = await this.commandExecutor.Execute(command);

            if (addedPrepStep == null)
            {
                return new AddPreparationStepResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new AddPreparationStepResponse()
            {
                Data = this.mapper.Map<PreparationStepDTO>(addedPrepStep)
            };
        }
    }
}

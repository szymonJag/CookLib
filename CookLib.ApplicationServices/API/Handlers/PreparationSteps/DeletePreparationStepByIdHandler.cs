using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.PreparationSteps;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.PreparationSteps;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.PreparationSteps
{
    public class DeletePreparationStepByIdHandler : IRequestHandler<DeletePreparationStepByIdRequest, DeletePreparationStepByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public DeletePreparationStepByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<DeletePreparationStepByIdResponse> Handle(DeletePreparationStepByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetPreparationStepByIdQuery() { Id = request.Id };
            var toDelete = await this.queryExecutor.Execute(query);
            var recipeId = toDelete.RecipeId;

            var queryRecipe = new GetRecipeByIdQuery() { Id = toDelete.RecipeId };
            var recipeAuthorId = (await this.queryExecutor.Execute(queryRecipe)).AuthorId;


            if (request.AuthenticatedUserId != recipeAuthorId || request.AuthenticatedRole != UserRole.Admin.ToString())
            {
                return new DeletePreparationStepByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            if (toDelete == null)
            {
                return new DeletePreparationStepByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var command = new DeletePreparationStepByIdCommand() { Parameter = toDelete };
            var deleted = await this.commandExecutor.Execute(command);

            var commandUpdateOrder = new UpdatePreparationStepsOrderCommand() { Parameter = recipeId };
            await this.commandExecutor.Execute(commandUpdateOrder);

            return new DeletePreparationStepByIdResponse()
            {
                Data = this.mapper.Map<PreparationStepDTO>(deleted)
            };
        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.PreparationSteps;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.PreparationSteps;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.PreparationSteps
{
    public class UpdatePreparationStepByIdHandler : IRequestHandler<UpdatePreparationStepByIdRequest, UpdatePreparationStepByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHelperMethods helper;

        public UpdatePreparationStepByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
        }

        public async Task<UpdatePreparationStepByIdResponse> Handle(UpdatePreparationStepByIdRequest request, CancellationToken cancellationToken)
        {
            var prepStepToUpdate = this.mapper.Map<PreparationStep>(request);
            var query = new GetPreparationStepByIdQuery() { Id = request.Id };
            var toChange = await this.queryExecutor.Execute(query);

            if (toChange == null)
            {
                return new UpdatePreparationStepByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var isAbleToDelete = helper.IsAuthorOrAdmin(request.AuthenticatedUserId, toChange.Recipe.AuthorId, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new UpdatePreparationStepByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new UpdatePreparationStepByIdCommand() { Parameter = prepStepToUpdate };
            var updated = await this.commandExecutor.Execute(command);

            return new UpdatePreparationStepByIdResponse()
            {
                Data = this.mapper.Map<PreparationStepDTO>(updated)
            };
        }
    }
}

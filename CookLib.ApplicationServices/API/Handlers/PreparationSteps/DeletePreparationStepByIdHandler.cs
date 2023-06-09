﻿using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.PreparationSteps;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.PreparationSteps;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.PreparationSteps
{
    public class DeletePreparationStepByIdHandler : IRequestHandler<DeletePreparationStepByIdRequest, DeletePreparationStepByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHelperMethods helper;

        public DeletePreparationStepByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
        }
        public async Task<DeletePreparationStepByIdResponse> Handle(DeletePreparationStepByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetPreparationStepByIdQuery() { Id = request.Id };
            var toDelete = await this.queryExecutor.Execute(query);
            var recipeId = toDelete.RecipeId;

            if (toDelete == null)
            {
                return new DeletePreparationStepByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var queryRecipe = new GetRecipeByIdQuery() { Id = toDelete.RecipeId };
            var recipeAuthorId = (await this.queryExecutor.Execute(queryRecipe)).AuthorId;
            var isAbleToDelete = helper.IsAuthorOrAdmin(request.AuthenticatedUserId, recipeAuthorId, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new DeletePreparationStepByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
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

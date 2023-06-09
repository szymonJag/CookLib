﻿using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.RecipeIngredients;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeIngredients
{
    public class UpdateRecipeIngredientByIdHandler : IRequestHandler<UpdateRecipeIngredientByIdRequest, UpdateRecipeIngredientByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHelperMethods helper;

        public UpdateRecipeIngredientByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
        }

        public async Task<UpdateRecipeIngredientByIdResponse> Handle(UpdateRecipeIngredientByIdRequest request, CancellationToken cancellationToken)
        {
            var recipeIngredientUpdated = this.mapper.Map<RecipeIngredient>(request);
            var query = new GetRecipeIngredientByIdQuery() { Id = request.Id };
            var toUpdate = await this.queryExecutor.Execute(query);

            if (toUpdate == null)
            {
                return new UpdateRecipeIngredientByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var isAbleToDelete = this.helper.IsAuthorOrAdmin(request.AuthenticatedUserId, toUpdate.Recipe.AuthorId, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new UpdateRecipeIngredientByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new UpdateRecipeIngredientByIdCommand() { Parameter = recipeIngredientUpdated };
            var updated = await this.commandExecutor.Execute(command);

            return new UpdateRecipeIngredientByIdResponse()
            {
                Data = updated
            };
        }
    }
}

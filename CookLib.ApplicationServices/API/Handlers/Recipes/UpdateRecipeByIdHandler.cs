using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Commands.Recipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.RecipeIngredients;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Recipes
{
    public class UpdateRecipeByIdHandler : IRequestHandler<UpdateRecipeByIdRequest, UpdateRecipeByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHelperMethods helper;
        private readonly IHandlerHelpers handlerHelpers;

        public UpdateRecipeByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper, IHandlerHelpers handlerHelpers)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
            this.handlerHelpers = handlerHelpers;
        }
        public async Task<UpdateRecipeByIdResponse> Handle(UpdateRecipeByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeByIdQuery() { Id = request.Id };
            var recipe = await this.queryExecutor.Execute(query);

            if (recipe == null)
            {
                return new UpdateRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var isAbleToUpdate = this.helper.IsAuthorOrAdmin(request.AuthenticatedUserId, recipe.AuthorId, request.AuthenticatedRole);

            if (!isAbleToUpdate)
            {
                return new UpdateRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var updatedRecipe = new Recipe()
            {
                Id = request.Id,
                Name = request.Name,
                PreparationTime = request.PreparationTime,
                ServingSize = request.ServingSize,
                AuthorId = request.AuthorId,
                CreateDate = recipe.CreateDate,
                Status = RecipeStatus.Oczekujący,
            };

            var recipeIngredientsQuery = new GetAllIngredientByRecipeIdQuery() { Id = request.Id };
            var recipeIngredients = await this.queryExecutor.Execute(recipeIngredientsQuery);

            foreach (var ingredient in recipeIngredients)
            {
                var deleteIngredientCommand = new DeleteRecipeIngredientByIdCommand() { Parameter = ingredient };
                await this.commandExecutor.Execute(deleteIngredientCommand);
            }

            handlerHelpers.AddIngredientsToDb(request.Ingredients, request.Id);

            var command = new UpdateRecipeByIdCommand()
            {
                Parameter = updatedRecipe,
            };

            var updatedRecipeDb = await this.commandExecutor.Execute(command);
            var response = new UpdateRecipeByIdResponse() { Data = this.mapper.Map<RecipeDTO>(updatedRecipeDb) };

            return response;
        }
    }
}

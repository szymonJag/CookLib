using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using CookLib.ApplicationServices.API.Handlers.PreparationSteps;
using CookLib.ApplicationServices.API.Handlers.RecipeTags;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Commands.Recipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.PreparationSteps;
using CookLib.DataAccess.CQRS.Queries.RecipeIngredients;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.CQRS.Queries.RecipeTags;
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
                PreparationSteps = this.mapper.Map<List<PreparationStep>>(request.PreparationSteps),
                RecipeTags = request.RecipeTags.Select(tagId => new RecipeTag
                {
                    RecipeId = recipe.Id,
                    TagId = tagId,
                }).ToList(),
                Ingredients = request.Ingredients.Select(ingredient =>
                {
                    var mappedIngredient = this.mapper.Map<RecipeIngredient>(ingredient);
                    mappedIngredient.RecipeId = recipe.Id;
                    return mappedIngredient;
                }).ToList(),
                CreateDate = recipe.CreateDate,
                Status = RecipeStatus.Oczekujący,
            };

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

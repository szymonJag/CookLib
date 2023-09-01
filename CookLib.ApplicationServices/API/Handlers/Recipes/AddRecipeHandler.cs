using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.PreparationSteps;
using CookLib.DataAccess.CQRS.Commands.Recipe;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Commands.RecipeTags;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Recipes
{
    public class AddRecipeHandler : IRequestHandler<AddRecipeRequest, AddRecipeResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IQueryExecutor queryExecutor;

        public AddRecipeHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.queryExecutor = queryExecutor;
        }
        public async Task<AddRecipeResponse> Handle(AddRecipeRequest request, CancellationToken cancellationToken)
        {
            DateTime currentDate = DateTime.Now;
            var query = new GetRecipesQuery() { Name = request.Name };
            var recipeFromDb = await this.queryExecutor.Execute(query);

            //if (recipeFromDb.Any())
            //{
            //    return new AddRecipeResponse()
            //    {
            //        Error = new ErrorModel("Recipe with given name already exists")
            //    };
            //}

            //var recipeRequest = new RecipeRequestDTO() { AuthorId = request.AuthorId, Name = request.Name, PreparationTime = request.PreparationTime, ServingSize = request.ServingSize, CreateDate = currentDate };
            var recipeRequest = this.mapper.Map<RecipeRequestDTO>(request);
            recipeRequest.CreateDate = currentDate;
            var recipeToAdd = this.mapper.Map<DataAccess.Entities.Recipe>(recipeRequest);

            var commandAddRecipe = new AddRecipeCommand() { Parameter = recipeToAdd };
            var commandAddRecipeIngredient = new AddRecipeIngredientCommand();
            var commandAddPreparationStep = new AddPreparationStepCommand();
            var commandAddRecipeTag = new AddRecipeTagCommand();

            var recipeDb = await commandExecutor.Execute(commandAddRecipe);

            foreach (var ingredient in request.Ingredients)
            {
                var mappedIngredient = this.mapper.Map<DataAccess.Entities.RecipeIngredient>(ingredient);
                mappedIngredient.RecipeId = recipeDb.Id;
                commandAddRecipeIngredient.Parameter = mappedIngredient;
                await commandExecutor.Execute(commandAddRecipeIngredient);
            }

            foreach (var step in request.PreparationSteps)
            {
                var mappedPreparationStep = this.mapper.Map<DataAccess.Entities.PreparationStep>(step);
                mappedPreparationStep.RecipeId = recipeDb.Id;
                commandAddPreparationStep.Parameter = mappedPreparationStep;
                await commandExecutor.Execute(commandAddPreparationStep);
            }

            foreach (var tag in request.RecipeTags)
            {
                var recipeTag = new DataAccess.Entities.RecipeTag() { RecipeId = recipeDb.Id, TagId = tag };
                commandAddRecipeTag.Parameter = recipeTag;
                await commandExecutor.Execute(commandAddRecipeTag);
            }

            if (recipeDb == null)
            {
                return new AddRecipeResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            var recipeQuery = new GetRecipeByIdQuery() { Id = recipeDb.Id };
            var addedRecipe = await queryExecutor.Execute(recipeQuery);

            return new AddRecipeResponse()
            {

                Data = mapper.Map<RecipeDTO>(addedRecipe)
            };

        }
    }
}

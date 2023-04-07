using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Recipe;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.Entities;
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
            var query = new GetRecipesQuery() { Name = request.Name };
            var recipeFromDb = await this.queryExecutor.Execute(query);

            if (recipeFromDb.Any())
            {
                return new AddRecipeResponse()
                {
                    Error = new ErrorModel("Recipe with given name already exists")
                };
            }

            var recipeToAdd = this.mapper.Map<Recipe>(request);
            var command = new AddRecipeCommand() { Parameter = recipeToAdd };
            var recipeFromDB = await commandExecutor.Execute(command);

            if (recipeFromDB == null)
            {
                return new AddRecipeResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new AddRecipeResponse()
            {
                Data = mapper.Map<RecipeDTO>(recipeFromDB)
            };
        }
    }
}

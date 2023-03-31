using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Recipes;
using CookLib.DataAccess.CQRS.Queries;
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

        public UpdateRecipeByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<UpdateRecipeByIdResponse> Handle(UpdateRecipeByIdRequest request, CancellationToken cancellationToken)
        {
            var recipeToUpdate = this.mapper.Map<Recipe>(request);

            var query = new GetRecipeByIdQuery() { Id = recipeToUpdate.Id };
            var ingredientToUpdate = await this.queryExecutor.Execute(query);

            recipeToUpdate.UserId = ingredientToUpdate.UserId;

            if (ingredientToUpdate == null)
            {
                return new UpdateRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var command = new UpdateRecipeByIdCommand() { Parameter = recipeToUpdate };
            var updated = await this.commandExecutor.Execute(command);

            return new UpdateRecipeByIdResponse()
            {
                Data = this.mapper.Map<RecipeDTO>(updated)
            };
        }
    }
}

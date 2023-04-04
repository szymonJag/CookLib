using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
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
            var query = new GetRecipeByIdQuery() { Id = request.Id };
            var getRecipe = await this.queryExecutor.Execute(query);

            if (getRecipe == null)
            {
                return new UpdateRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var mappedCommand = this.mapper.Map<Recipe>(request);
            mappedCommand.AuthorId = getRecipe.AuthorId;
            mappedCommand.CreateDate = getRecipe.CreateDate;

            var command = new UpdateRecipeByIdCommand()
            {
                Parameter = mappedCommand,
            };
            var updatedRecipe = await this.commandExecutor.Execute(command);
            var response = new UpdateRecipeByIdResponse() { Data = this.mapper.Map<RecipeDTO>(updatedRecipe) };

            return response;
        }
    }
}

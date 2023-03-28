using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.RecipeIngredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeIngredients
{
    public class DeleteRecipeIngredientByIdHandler : IRequestHandler<DeleteRecipeIngredientByIdRequest, DeleteRecipeIngredientByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public DeleteRecipeIngredientByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }

        public async Task<DeleteRecipeIngredientByIdResponse> Handle(DeleteRecipeIngredientByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeIngredientById() { Id = request.Id };
            var recipeIngredientToDelete = await this.queryExecutor.Execute(query);

            if (recipeIngredientToDelete == null)
            {
                return new DeleteRecipeIngredientByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var command = new DeleteRecipeIngredientByIdCommand() { Parameter = recipeIngredientToDelete };
            var deleted = await this.commandExecutor.Execute(command);

            return new DeleteRecipeIngredientByIdResponse()
            {
                Data = deleted
            };
        }
    }
}

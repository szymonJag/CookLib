using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.RecipeIngredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeIngredients
{
    public class DeleteRecipeIngredientByIdHandler : IRequestHandler<DeleteRecipeIngredientByIdRequest, DeleteRecipeIngredientByIdResponse>
    {
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHelperMethods helper;

        public DeleteRecipeIngredientByIdHandler(IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
        }

        public async Task<DeleteRecipeIngredientByIdResponse> Handle(DeleteRecipeIngredientByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeIngredientByIdQuery() { Id = request.Id };
            var recipeIngredientToDelete = await this.queryExecutor.Execute(query);

            if (recipeIngredientToDelete == null)
            {
                return new DeleteRecipeIngredientByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var isAbleToDelete = this.helper.IsAuthorOrAdmin(request.AuthenticatedUserId, recipeIngredientToDelete.Recipe.AuthorId, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new DeleteRecipeIngredientByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
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

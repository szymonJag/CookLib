using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Recipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Recipes
{
    public class DeleteRecipeByIdHandler : IRequestHandler<DeleteRecipeByIdRequest, DeleteRecipeByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHelperMethods helper;

        public DeleteRecipeByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
        }
        public async Task<DeleteRecipeByIdResponse> Handle(DeleteRecipeByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeByIdQuery() { Id = request.Id };
            var recipeToDelete = await this.queryExecutor.Execute(query);

            if (recipeToDelete == null)
            {
                return new DeleteRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var isAbleToDelete = this.helper.IsAuthorOrAdmin(request.AuthenticatedUserId, recipeToDelete.AuthorId, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new DeleteRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new DeleteRecipeByIdCommand() { Parameter = recipeToDelete };
            var deleted = await this.commandExecutor.Execute(command);

            return new DeleteRecipeByIdResponse
            {
                Data = this.mapper.Map<RecipeDTO>(deleted)
            };
        }
    }
}

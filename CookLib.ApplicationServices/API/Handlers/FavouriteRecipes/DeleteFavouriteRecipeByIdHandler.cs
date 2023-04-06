using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.FavouriteRecipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.FavouriteRecipes
{
    public class DeleteFavouriteRecipeByIdHandler : IRequestHandler<DeleteFavouriteRecipeByIdRequest, DeleteFavouriteRecipeByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public DeleteFavouriteRecipeByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<DeleteFavouriteRecipeByIdResponse> Handle(DeleteFavouriteRecipeByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetFavouriteRecipeByIdQuery() { Id = request.Id };
            var favouriteRecipeToDelete = await this.queryExecutor.Execute(query);

            if (favouriteRecipeToDelete == null)
            {
                return new DeleteFavouriteRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            if (request.AuthenticatedUserId != favouriteRecipeToDelete.UserId)
            {
                return new DeleteFavouriteRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new DeleteFavouriteRecipeByIdCommand() { Parameter = favouriteRecipeToDelete };
            var deleted = await this.commandExecutor.Execute(command);

            return new DeleteFavouriteRecipeByIdResponse()
            {
                Data = this.mapper.Map<FavouriteRecipeDTO>(deleted)
            };
        }
    }
}

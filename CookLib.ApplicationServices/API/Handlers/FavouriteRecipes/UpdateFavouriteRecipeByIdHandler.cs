using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.FavouriteRecipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.FavouriteRecipes
{
    public class UpdateFavouriteRecipeByIdHandler : IRequestHandler<UpdateFavouriteRecipeByIdRequest, UpdateFavouriteRecipeByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public UpdateFavouriteRecipeByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<UpdateFavouriteRecipeByIdResponse> Handle(UpdateFavouriteRecipeByIdRequest request, CancellationToken cancellationToken)
        {
            var favRecipeRequest = this.mapper.Map<FavouriteRecipe>(request);

            var query = new GetFavouriteRecipeByIdQuery() { Id = favRecipeRequest.Id };
            var favRecipeFromDb = await this.queryExecutor.Execute(query);
            if (favRecipeFromDb == null)
            {
                return new UpdateFavouriteRecipeByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }
            var command = new UpdateFavouriteRecipeByIdCommand() { Parameter = favRecipeFromDb };
            var updated = await this.commandExecutor.Execute(command);

            return new UpdateFavouriteRecipeByIdResponse()
            {
                Data = this.mapper.Map<FavouriteRecipeDTO>(updated)
            };
        }
    }
}

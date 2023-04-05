using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.FavouriteRecipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.FavouriteRecipes
{
    public class AddFavouriteRecipeHandler : IRequestHandler<AddFavouriteRecipeRequest, AddFavouriteRecipeResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public AddFavouriteRecipeHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }

        public async Task<AddFavouriteRecipeResponse> Handle(AddFavouriteRecipeRequest request, CancellationToken cancellationToken)
        {
            var favouriteRecipe = mapper.Map<FavoriteRecipe>(request);
            var command = new AddFavouriteRecipeCommand() { Parameter = favouriteRecipe };
            var ingredientDb = await commandExecutor.Execute(command);

            if (ingredientDb == null)
            {
                return new AddFavouriteRecipeResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new AddFavouriteRecipeResponse()
            {
                Data = mapper.Map<FavouriteRecipeDTO>(ingredientDb)
            };
        }
    }
}

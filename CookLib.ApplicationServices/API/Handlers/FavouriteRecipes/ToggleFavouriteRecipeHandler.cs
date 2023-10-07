using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.CQRS.Queries.Users;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.FavouriteRecipes
{
    public class ToggleFavouriteRecipeHandler : IRequestHandler<ToggleFavouriteRecipeRequest, ToggleFavouriteRecipeResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IQueryExecutor queryExecutor;

        public ToggleFavouriteRecipeHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.queryExecutor = queryExecutor;
        }

        public async Task<ToggleFavouriteRecipeResponse> Handle(ToggleFavouriteRecipeRequest request, CancellationToken cancellationToken)
        {
            var recipeQuery = new GetRecipeByIdQuery() { Id = request.RecipeId };
            var recipe = await queryExecutor.Execute(recipeQuery);

            var userQuery = new GetUserByIdQuery() { Id = request.AuthenticatedUserId };
            Console.WriteLine($"-----------------{request.AuthenticatedUserId}-----------");
            var user = await queryExecutor.Execute(userQuery);

            if (recipe == null || user == null)
            {
                return new ToggleFavouriteRecipeResponse
                {
                    Error = new ErrorModel($"{ErrorType.NotFound} - chuj")
                };
            }

            var userFavourites = user.Favourites.Select(x => x.RecipeId);
            if (userFavourites.Contains(request.RecipeId))
            {
                var favId = user.Favourites.FirstOrDefault(x => x.RecipeId == request.RecipeId).Id;
                var favQuery = new GetFavouriteRecipeByIdQuery() { Id = favId };
                var favToDelete = await queryExecutor.Execute(favQuery);

                var favDeleteCommand = new DeleteFavouriteRecipeByIdCommand() { Parameter = favToDelete };
                var favDeleted = await commandExecutor.Execute(favDeleteCommand);

                return new ToggleFavouriteRecipeResponse()
                {
                    Data = this.mapper.Map<FavouriteRecipeDTO>(favDeleted)
                };
            }


            var favouriteRecipe = new FavouriteRecipe() { RecipeId = request.RecipeId, UserId = request.AuthenticatedUserId };
            var command = new AddFavouriteRecipeCommand() { Parameter = favouriteRecipe };
            var ingredientDb = await commandExecutor.Execute(command);

            if (ingredientDb == null)
            {
                return new ToggleFavouriteRecipeResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new ToggleFavouriteRecipeResponse()
            {
                Data = mapper.Map<FavouriteRecipeDTO>(ingredientDb)
            };
        }

    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using CookLib.DataAccess;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.FavouriteRecipes;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.FavouriteRecipes
{
    public class GetAllFavouriteRecipesByUserIdHandler : IRequestHandler<GetAllFavouriteRecipesByUserIdRequest, GetAllFavouriteRecipesByUserIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetAllFavouriteRecipesByUserIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetAllFavouriteRecipesByUserIdResponse> Handle(GetAllFavouriteRecipesByUserIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetAllFavouriteRecipesByUserIdQuery() { Id = request.Id };
            var favouriteRecipes = await this.queryExecutor.Execute(query);

            if (favouriteRecipes == null)
            {
                return new GetAllFavouriteRecipesByUserIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var favouritesRecipesIds = favouriteRecipes.Select(x => x.RecipeId).ToList();
            var recipesQuery = new GetRecipesByIdsQuery() { Ids = favouritesRecipesIds };
            var favourites = this.queryExecutor.Execute(recipesQuery);

            return new GetAllFavouriteRecipesByUserIdResponse()
            {
                Data = this.mapper.Map<List<ShortRecipeDTO>>(favourites)
            };
        }
    }
}

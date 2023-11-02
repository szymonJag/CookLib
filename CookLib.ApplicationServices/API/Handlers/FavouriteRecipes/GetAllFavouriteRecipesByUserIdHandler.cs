using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
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

            // if (request.AuthenticatedUserId != favouriteRecipes[0].UserId)
            // {
            //     return new GetAllFavouriteRecipesByUserIdResponse()
            //     {
            //         Error = new ErrorModel(ErrorType.Unauthorized)
            //     };
            // }

            var favouritesRecipesIds = favouriteRecipes.Select(x => x.RecipeId).ToList();
            var favouritesRecipes = new List<Recipe>();

            foreach (var fav in favouritesRecipesIds)
            {
                var favQuery = new GetRecipeByIdQuery() { Id = fav };
                var fetched = await this.queryExecutor.Execute(favQuery);
                favouritesRecipes.Add(fetched);
            }

            return new GetAllFavouriteRecipesByUserIdResponse()
            {
                Data = this.mapper.Map<List<ShortRecipeDTO>>(favouritesRecipes)
            };
        }
    }
}

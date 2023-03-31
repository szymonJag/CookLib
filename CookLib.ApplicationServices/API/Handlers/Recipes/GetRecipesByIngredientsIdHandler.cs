using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Recipes
{
    public class GetRecipesByIngredientsIdHandler : IRequestHandler<GetRecipesByIngredientsIdRequest, GetRecipesByIngredientsIdResponse>
    {
        public async Task<GetRecipesByIngredientsIdResponse> Handle(GetRecipesByIngredientsIdRequest request, CancellationToken cancellationToken)
        {
            var ids = request.IngredientsId1.ToList();
            var response = new GetRecipesByIngredientsIdResponse() { Data = ids };


            return response;
        }
    }
}

using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FavouriteRecipesController : ApiControllerBase
    {
        public FavouriteRecipesController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("userId/{id}")]
        public async Task<IActionResult> GetAllFavouriteRecipesByUserId([FromRoute] int id)
        {
            var request = new GetAllFavouriteRecipesByUserIdRequest() { Id = id };
            return await this.HandleRequest<GetAllFavouriteRecipesByUserIdRequest, GetAllFavouriteRecipesByUserIdResponse>(request);
        }

        [HttpPost]
        [Authorize(Roles = "Default,Admin")]
        [Route("toggleFavouriteRecipe/{id}")]
        public async Task<IActionResult> ToggleFavouriteRecipe([FromRoute] int id)
        {
            var request = new ToggleFavouriteRecipeRequest() { RecipeId = id };
            return await this.HandleRequest<ToggleFavouriteRecipeRequest, ToggleFavouriteRecipeResponse>(request);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteFavouriteRecipeById([FromRoute] int id)
        {
            var request = new DeleteFavouriteRecipeByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteFavouriteRecipeByIdRequest, DeleteFavouriteRecipeByIdResponse>(request);
        }
    }
}

using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
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
        [Route("add/")]
        public async Task<IActionResult> AddFavouriteRecipe([FromBody] AddFavouriteRecipeRequest request)
        {
            return await this.HandleRequest<AddFavouriteRecipeRequest, AddFavouriteRecipeResponse>(request);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteFavouriteRecipeById([FromRoute] int id)
        {
            var request = new DeleteFavouriteRecipeByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteFavouriteRecipeByIdRequest, DeleteFavouriteRecipeByIdResponse>(request);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateFavouriteRecipeById([FromRoute] int id, [FromBody] UpdateFavouriteRecipeByIdRequest request)
        {
            request.Id = id;
            return await this.HandleRequest<UpdateFavouriteRecipeByIdRequest, UpdateFavouriteRecipeByIdResponse>(request);
        }
    }
}

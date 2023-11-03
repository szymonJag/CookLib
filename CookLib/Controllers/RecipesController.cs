using CookLib.ApplicationServices;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.FavouriteRecipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipesController : ApiControllerBase
    {
        public RecipesController(IMediator mediator) : base(mediator)
        {
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getAll/")]
        public async Task<IActionResult> GetRecipes([FromQuery] GetAllRecipesRequest request)
        {
            return await this.HandleRequest<GetAllRecipesRequest, GetAllRecipesResponse>(request);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getShortAll/")]
        public async Task<IActionResult> GetShortReicpes([FromQuery] GetAllShortRecipesRequest request)
        {
            return await this.HandleRequest<GetAllShortRecipesRequest, GetAllShortRecipesResponse>(request);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetRecipeById([FromRoute] int id)
        {
            var request = new GetRecipeByIdRequest() { Id = id };
            return await this.HandleRequest<GetRecipeByIdRequest, GetRecipeByIdResponse>(request);
        }


        [HttpGet]
        [Route("getFavouritesByUserId/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllFavouriteRecipesByUserId([FromRoute] int id)
        {
            var request = new GetAllFavouriteRecipesByUserIdRequest() { Id = id };
            return await this.HandleRequest<GetAllFavouriteRecipesByUserIdRequest, GetAllFavouriteRecipesByUserIdResponse>(request);
        }

        [HttpGet]
        [Route("getRecipesCreatedByUserId/{id}")]
        public async Task<IActionResult> GetRecipesCreatedByUser([FromRoute] int id)
        {
            var request = new GetRecipesCreatedByUserIdRequest() { Id = id };
            return await this.HandleRequest<GetRecipesCreatedByUserIdRequest, GetRecipesCreatedByUserIdResponse>(request);
        }

        [HttpPost]
        [Route("getByIngredientsId/")]
        public async Task<IActionResult> GetRecipesByIngredientsId([FromBody] GetRecipesByIngredientsIdRequest request)
        {
            return await this.HandleRequest<GetRecipesByIngredientsIdRequest, GetRecipesByIngredientsIdResponse>(request);
        }

        //[HttpPost]
        //[Route("getByTagsId/")]
        //public async Task<IActionResult> GetRecipesByTagsId([FromBody] GetRecipesByTagsIdRequest request)
        //{
        //    return await this.HandleRequest<GetRecipesByTagsIdRequest, GetRecipesByTagsIdResponse>(request);
        //}
        [AllowAnonymous]
        [HttpPost]
        [Route("addRecipe/")]
        public async Task<IActionResult> AddRecipe([FromBody] AddRecipeRequest request)
        {
            return await this.HandleRequest<AddRecipeRequest, AddRecipeResponse>(request);
        }

        [Authorize(Roles = "Default Admin")]
        [HttpDelete]
        [Route("deleteRecipeById/{id}")]
        public async Task<IActionResult> DeleteRecipeById([FromRoute] int id)
        {
            var request = new DeleteRecipeByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteRecipeByIdRequest, DeleteRecipeByIdResponse>(request);
        }

        [HttpPut]
        [Route("update/{id}")]
        public Task UpdateRecipeById([FromRoute] int id, [FromBody] UpdateRecipeByIdRequest request)
        {
            request.Id = id;
            return this.HandleRequest<UpdateRecipeByIdRequest, UpdateRecipeByIdResponse>(request);
        }


    }
}

using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;
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

        [HttpGet]
        [Route("getAll/")]
        public async Task<IActionResult> GetRecipes([FromQuery] GetAllRecipesRequest request)
        {
            return await this.HandleRequest<GetAllRecipesRequest, GetAllRecipesResponse>(request);
        }
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetRecipeById([FromRoute] int id)
        {
            var request = new GetRecipeByIdRequest() { Id = id };
            return await this.HandleRequest<GetRecipeByIdRequest, GetRecipeByIdResponse>(request);
        }

        [HttpPost]
        [Route("getByIngredientsId/")]
        public async Task<IActionResult> GetRecipesByIngredientsId([FromBody] GetRecipesByIngredientsIdRequest request)
        {
            return await this.HandleRequest<GetRecipesByIngredientsIdRequest, GetRecipesByIngredientsIdResponse>(request);
        }

        [HttpPost]
        [Route("addRecipe/")]
        public async Task<IActionResult> AddRecipe([FromBody] AddRecipeRequest request)
        {
            return await this.HandleRequest<AddRecipeRequest, AddRecipeResponse>(request);
        }

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

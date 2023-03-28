using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredient;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace CookLib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeIngredientsController : ApiControllerBase
    {
        public RecipeIngredientsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("recipeId/{recipeId}")]
        public async Task<IActionResult> GetAllIngredientsByRecipeId([FromRoute] int recipeId)
        {
            var request = new GetAllIngredientsByRecipeIdRequest() { Id = recipeId };
            return await this.HandleRequest<GetAllIngredientsByRecipeIdRequest, GetAllIngredientsByRecipeIdResponse>(request);
        }

        [HttpPost]
        [Route("add/")]
        public async Task<IActionResult> AddRecipeIngredient([FromBody] AddRecipeIngredientRequest request)
        {
            return await this.HandleRequest<AddRecipeIngredientRequest, AddRecipeIngredientResponse>(request);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public Task<IActionResult> DeleteRecipeIngredientById([FromRoute] int id)
        {
        }

        //}
        //[HttpPut]
        //[Route("update/{id}")]
        //public Task<IActionResult> UpdateRecipeIngredientById([FromRoute] int id, [FromBody] UpdateRecipeIngredientByIdRequest request)
        //{

        //}
    }
}

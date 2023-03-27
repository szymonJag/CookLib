using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredient;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace CookLib.Controllers
{
    public class RecipeIngredientsController : ApiControllerBase
    {
        public RecipeIngredientsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("/recipeId/{recipeId}")]
        public Task<IActionResult> GetAllIngredientsByRecipeId(int id)
        {
            var request = new GetAllIngredientsByRecipeIdRequest() { Id = id };
            return HandleRequest<GetAllIngredientsByRecipeIdRequest, GetAllIngredientsByRecipeIdResponse>(request);
        }

        //[HttpPost]
        //[Route("add/")]
        //public Task<IActionResult> AddRecipeIngredient([FromBody] AddRecipeIngredientRequest request)
        //{

        //}

        //[HttpDelete]
        //[Route("delete/{id}")]
        //public Task<IActionResult> DeleteRecipeIngredientById([FromRoute] int id)
        //{

        //}
        //[HttpPut]
        //[Route("update/{id}")]
        //public Task<IActionResult> UpdateRecipeIngredientById([FromRoute] int id, [FromBody] UpdateRecipeIngredientByIdRequest request)
        //{

        //}
    }
}

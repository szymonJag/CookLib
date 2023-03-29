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
            return Ok();
        }
    }
}

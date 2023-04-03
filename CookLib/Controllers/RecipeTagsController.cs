using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeTagsController : ApiControllerBase
    {
        public RecipeTagsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("getByRecipeId/{id}")]
        public async Task<IActionResult> GetRecipeTagsById(int id)
        {
            var request = new GetRecipeTagsByIdRequest() { Id = id };
            return await this.HandleRequest<GetRecipeTagsByIdRequest, GetRecipeTagsByIdResponse>(request);
        }
    }
}

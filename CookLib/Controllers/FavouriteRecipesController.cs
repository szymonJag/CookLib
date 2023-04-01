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
            var request = new GetAllFavouriteRecipesByIdRequest() { Id = id };
            return this.HandleRequest<GetAllFavouriteRecipesByUserIdRequest, GetAllFavouriteRecipesByUserIdResponse>(request);
        }
    }
}

using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class IngredientsController : ApiControllerBase
    {

        public IngredientsController(IMediator mediator) : base(mediator)
        {
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getByName/")]
        public async Task<IActionResult> GetIngredients([FromQuery] GetIngredientsRequest request)
        {
            return await this.HandleRequest<GetIngredientsRequest, GetIngredientsResponse>(request);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getById/{id}/")]
        public async Task<IActionResult> GetIngredientById([FromRoute] int id)
        {
            var request = new GetIngredientByIdRequest() { Id = id };
            return await this.HandleRequest<GetIngredientByIdRequest, GetIngredientByIdResponse>(request); ;
        }

        //[Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpPost]
        [Route("add/")]
        public async Task<IActionResult> AddIngredient([FromBody] AddIngredientRequest request)
        {
            return await this.HandleRequest<AddIngredientRequest, AddIngredientResponse>(request);
        }

        //[Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteIngredientById([FromRoute] int id)
        {
            var request = new DeleteIngredientByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteIngredientByIdRequest, DeleteIngredientByIdResponse>(request);
        }

        //[Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateIngredientById([FromRoute] int id, [FromBody] UpdateIngredientByIdRequest request)
        {
            request.Id = id;
            return await this.HandleRequest<UpdateIngredientByIdRequest, UpdateIngredientByIdResponse>(request);
        }
    }
}

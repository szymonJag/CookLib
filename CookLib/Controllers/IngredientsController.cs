using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngredientsController : ApiControllerBase
    {

        public IngredientsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("getByName/")]
        public async Task<IActionResult> GetIngredients([FromQuery] GetIngredientsRequest request)
        {
            return await this.HandleRequest<GetIngredientsRequest, GetIngredientsResponse>(request);
        }

        [HttpGet]
        [Route("getById/{id}/")]
        public async Task<IActionResult> GetIngredientById([FromRoute] int id)
        {
            var request = new GetIngredientByIdRequest() { Id = id };
            return await this.HandleRequest<GetIngredientByIdRequest, GetIngredientByIdResponse>(request); ;
        }

        [HttpPost]
        [Route("add/")]
        public async Task<IActionResult> AddIngredient([FromBody] AddIngredientRequest request)
        {
            return await this.HandleRequest<AddIngredientRequest, AddIngredientResponse>(request);
        }


        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteIngredientById([FromRoute] int id)
        {
            var request = new DeleteIngredientByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteIngredientByIdRequest, DeleteIngredientByIdResponse>(request);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateIngredientById([FromRoute] int id, [FromBody] UpdateIngredientByIdRequest request)
        {
            request.Id = id;
            return await this.HandleRequest<UpdateIngredientByIdRequest, UpdateIngredientByIdResponse>(request);
        }
    }
}

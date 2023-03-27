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
        private readonly IMediator mediator;

        public IngredientsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("")]
        public Task<IActionResult> GetIngredients([FromQuery] GetIngredientsRequest request)
        {
            return this.HandleRequest<GetIngredientsRequest, GetIngredientsResponse>(request);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetIngredientById([FromRoute] int id)
        {
            var request = new GetIngredientByIdRequest() { Id = id };
            var response = await this.mediator.Send(request);
            return this.Ok(response);
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> AddIngredient([FromBody] AddIngredientRequest request)
        {
            var response = await this.mediator.Send(request);
            return this.Ok(response);
        }


        [HttpDelete]
        [Route("/DeleteIngredient/{id}")]
        public async Task<IActionResult> DeleteIngredientById([FromRoute] int id)
        {
            var request = new DeleteIngredientByIdRequest() { Id = id };
            var response = await this.mediator.Send(request);
            return this.Ok(response);
        }

        [HttpPut]
        [Route("UpdateIngredient/{id}")]
        public async Task<IActionResult> UpdateIngredientById([FromRoute] int id, [FromBody] UpdateIngredientByIdRequest request)
        {
            request.Id = id;
            var response = await this.mediator.Send(request);
            return this.Ok(response);
        }
    }
}

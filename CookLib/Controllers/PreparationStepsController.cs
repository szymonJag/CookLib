using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PreparationStepsController : ApiControllerBase
    {
        public PreparationStepsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("getStepsByRecipeId/{id}")]
        public async Task<IActionResult> GetAllPreparationStepsByRecipeId(int id)
        {
            var request = new GetAllPreparationStepsByRecipeIdRequest() { Id = id };
            return await this.HandleRequest<GetAllPreparationStepsByRecipeIdRequest, GetAllPreparationStepsByRecipeIdResponse>(request);
        }

        [HttpPost]
        [Route("add/")]
        public async Task<IActionResult> AddPreparationStep(AddPreparationStepRequest request)
        {
            return await this.HandleRequest<AddPreparationStepRequest, AddPreparationStepResponse>(request);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeletePreparationStepById([FromRoute] int id)
        {
            var request = new DeletePreparationStepByIdRequest() { Id = id };
            return await this.HandleRequest<DeletePreparationStepByIdRequest, DeletePreparationStepByIdResponse>(request);
        }
    }
}

﻿using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
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
    }
}

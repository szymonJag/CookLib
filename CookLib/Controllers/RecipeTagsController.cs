using CookLib.ApplicationServices.API.Domain.Requests.RecipeTags;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RecipeTagsController : ApiControllerBase
    {
        public RecipeTagsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("getByRecipeId/{id}")]
        public async Task<IActionResult> GetRecipeTagsByRecipeId(int id)
        {
            var request = new GetRecipeTagsByRecipeIdRequest() { Id = id };
            return await this.HandleRequest<GetRecipeTagsByRecipeIdRequest, GetRecipeTagsByRecipeIdResponse>(request);
        }

        [HttpPost]
        [Route("add/")]
        public async Task<IActionResult> AddRecipeTag([FromBody] AddRecipeTagRequest request)
        {
            return await this.HandleRequest<AddRecipeTagRequest, AddRecipeTagResponse>(request);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteRecipeTagById(int id)
        {
            var request = new DeleteRecipeTagByIdRequest() { Id = id };
            return await this.HandleRequest<DeleteRecipeTagByIdRequest, DeleteRecipeTagByIdResponse>(request);
        }
    }
}

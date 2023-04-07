using CookLib.ApplicationServices.API.Domain.Requests.Tags;
using CookLib.ApplicationServices.API.Domain.Responses.Tags;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TagsController : ApiControllerBase
    {
        public TagsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<IActionResult> GetTagById([FromRoute] int id)
        {
            var request = new GetTagByIdRequest() { Id = id };
            return await this.HandleRequest<GetTagByIdRequest, GetTagByIdResponse>(request);
        }

        [HttpGet]
        [Route("getByName/")]
        public async Task<IActionResult> GetTags([FromQuery] GetTagsRequest request)
        {
            return await this.HandleRequest<GetTagsRequest, GetTagsResponse>(request);
        }
    }
}

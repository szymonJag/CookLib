using CookLib.ApplicationServices.API.Domain.Requests.Images;
using CookLib.ApplicationServices.API.Domain.Responses.Images;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookLib.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class UploadImagesController : ApiControllerBase
    {
        public UploadImagesController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> UploadImage(List<IFormFile> images, [FromQuery] int recipeId)
        {
            var request = new UploadImageRequest() { Images = images, RecipeId = recipeId };
            return await this.HandleRequest<UploadImageRequest, UploadImageResponse>(request);
        }
    }
}

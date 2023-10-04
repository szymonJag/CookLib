using CookLib.ApplicationServices;
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
        [Route("uploadRecipeImage")]
        public async Task<IActionResult> UploadRecipeImages(List<IFormFile> images, [FromQuery] int recipeId)
        {
            var request = new UploadRecipeImagesRequest() { Images = images, RecipeId = recipeId };
            return await this.HandleRequest<UploadRecipeImagesRequest, UploadRecipeImagesResponse>(request);
        }

        [HttpPost]
        [Route("uploadAvatar")]
        public async Task<IActionResult> UploadImage(IFormFile image, [FromQuery] int userId)
        {
            var request = new UploadUserAvatarRequest() { Image = image, UserId = userId };
            return await this.HandleRequest<UploadUserAvatarRequest, UploadUserAvatarRespone>(request);
        }
    }
}

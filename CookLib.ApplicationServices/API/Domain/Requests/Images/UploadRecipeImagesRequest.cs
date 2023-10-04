using CookLib.ApplicationServices.API.Domain.Responses.Images;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace CookLib.ApplicationServices.API.Domain.Requests.Images
{
    public class UploadRecipeImagesRequest : RequestBase, IRequest<UploadRecipeImagesResponse>
    {
        public List<IFormFile> Images { get; set; }
        public int RecipeId { get; set; }
    }
}

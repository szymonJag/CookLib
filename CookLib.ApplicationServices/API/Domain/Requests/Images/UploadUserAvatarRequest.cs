using MediatR;
using Microsoft.AspNetCore.Http;

namespace CookLib.ApplicationServices.API.Domain.Requests.Images
{
    public class UploadUserAvatarRequest : RequestBase, IRequest<UploadUserAvatarRespone>
    {
        public IFormFile Image { get; set; }
        public int UserId { get; set; }
    }
}

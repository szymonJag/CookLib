using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Requests.Images;
using CookLib.ApplicationServices.API.Domain.Responses.Images;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Images;
using CookLib.DataAccess.Entities;
using MediatR;
using Microsoft.AspNetCore.Hosting;

namespace CookLib.ApplicationServices.API.Handlers.Images
{
    public class UploadRecipeImagesHandler : IRequestHandler<UploadRecipeImagesRequest, UploadRecipeImagesResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHostingEnvironment hostingEnvironment;


        public UploadRecipeImagesHandler(IMapper mapper, ICommandExecutor commandExecutor, IHostingEnvironment hostingEnvironment)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.hostingEnvironment = hostingEnvironment;
        }

        public async Task<UploadRecipeImagesResponse> Handle(UploadRecipeImagesRequest request, CancellationToken cancellationToken)
        {
            var images = request.Images;
            var uploadedImages = new List<byte[]>(); // Lista na przesłane obrazy
            var directoryPath = "ImagesStore";

            if (images == null || images.Count == 0)
            {
                return new UploadRecipeImagesResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            foreach (var image in images)
            {
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                var imagePath = Path.Combine(directoryPath, uniqueFileName);

                using (var stream = new FileStream(Path.Combine(hostingEnvironment.WebRootPath, imagePath), FileMode.Create))
                {
                    image.CopyTo(stream);
                }

                var img = new Image
                {
                    RecipeId = request.RecipeId,
                    ImagePath = $"https://localhost:7059/{imagePath}",
                };

                var command = new UploadImageCommand() { Parameter = img };
                var imgDb = await commandExecutor.Execute(command);
            }

            return new UploadRecipeImagesResponse()
            {
                Data = uploadedImages,
            };
        }

    }
}

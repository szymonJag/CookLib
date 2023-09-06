using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Requests.Images;
using CookLib.ApplicationServices.API.Domain.Responses.Images;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Images;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Images
{
    public class UploadImageHandler : IRequestHandler<UploadImageRequest, UploadImageResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public UploadImageHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }

        public async Task<UploadImageResponse> Handle(UploadImageRequest request, CancellationToken cancellationToken)
        {
            var images = request.Images;
            var uploadedImages = new List<byte[]>(); // Lista na przesłane obrazy

            if (images == null || images.Count == 0)
            {
                return new UploadImageResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            foreach (var image in images)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await image.CopyToAsync(memoryStream);

                    var img = new Image
                    {
                        RecipeId = request.RecipeId,
                        ImageContent = memoryStream.ToArray()
                    };

                    var command = new UploadImageCommand() { Parameter = img };
                    var imgDb = await commandExecutor.Execute(command);

                    uploadedImages.Add(imgDb.ImageContent); // Dodaj przesłany obraz do listy
                }
            }

            return new UploadImageResponse()
            {
                Data = uploadedImages, // Przypisz listę przesłanych obrazów
            };
        }

    }
}

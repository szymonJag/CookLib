using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Requests.Images;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Users;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;
using Microsoft.AspNetCore.Hosting;

namespace CookLib.ApplicationServices;

public class UploadUserAvatarHandler : IRequestHandler<UploadUserAvatarRequest, UploadUserAvatarRespone>
{
    private readonly IMapper mapper;
    private readonly ICommandExecutor commandExecutor;
    private readonly IHostingEnvironment hostingEnvironment;
    private readonly IQueryExecutor queryExecutor;

    public UploadUserAvatarHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor, IHostingEnvironment hostingEnvironment)
    {
        this.mapper = mapper;
        this.queryExecutor = queryExecutor;
        this.commandExecutor = commandExecutor;
        this.hostingEnvironment = hostingEnvironment;
    }

    public async Task<UploadUserAvatarRespone> Handle(UploadUserAvatarRequest request, CancellationToken cancellationToken)
    {
        var query = new GetUserByIdQuery() { Id = request.UserId };
        var user = await queryExecutor.Execute(query);

        if (user == null)
        {
            return new UploadUserAvatarRespone() { Error = new API.Domain.ErrorHandling.ErrorModel(ErrorType.NotFound) };
        }

        var directoryPath = "ImagesStore";
        var uniqueFileName = Guid.NewGuid().ToString() + "_" + request.Image.FileName;
        var imagePath = Path.Combine(directoryPath, uniqueFileName);

        using (var stream = new FileStream(Path.Combine(hostingEnvironment.WebRootPath, imagePath), FileMode.Create))
        {
            request.Image.CopyTo(stream);
        }

        user.AvatarURL = $"https://localhost:7059/{imagePath}";

        var updateUserCommand = new UpdateUserByIdCommand() { Parameter = user };
        var updatedUser = await commandExecutor.Execute(updateUserCommand);

        return new UploadUserAvatarRespone()
        {
            Data = updatedUser.AvatarURL,
        };
    }


}

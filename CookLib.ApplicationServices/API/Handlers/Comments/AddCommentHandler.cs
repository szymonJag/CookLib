using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Comments;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Comments
{
    public class AddCommentHandler : IRequestHandler<AddCommentRequest, AddCommentResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public AddCommentHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }
        public async Task<AddCommentResponse> Handle(AddCommentRequest request, CancellationToken cancellationToken)
        {
            var commentToAdd = this.mapper.Map<Comment>(request);
            commentToAdd.CreationDate = DateTime.UtcNow;

            var command = new AddCommentCommand() { Parameter = commentToAdd };
            var added = await this.commandExecutor.Execute(command);

            if (added == null)
            {
                return new AddCommentResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new AddCommentResponse()
            {
                Data = this.mapper.Map<CommentDTO>(added)
            };
        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Comments;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Comments;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Comments
{
    public class UpdateCommentByIdHandler : IRequestHandler<UpdateCommentByIdRequest, UpdateCommentByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public UpdateCommentByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<UpdateCommentByIdResponse> Handle(UpdateCommentByIdRequest request, CancellationToken cancellationToken)
        {
            var toUpdate = this.mapper.Map<Comment>(request);

            var query = new GetCommentByIdQuery() { Id = toUpdate.Id };
            var commentToUpdate = await this.queryExecutor.Execute(query);

            if (commentToUpdate == null)
            {
                return new UpdateCommentByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var command = new UpdateCommentByIdCommand() { Parameter = toUpdate };
            var updated = await this.commandExecutor.Execute(command);

            return new UpdateCommentByIdResponse()
            {
                Data = this.mapper.Map<CommentDTO>(updated)
            };
        }
    }
}

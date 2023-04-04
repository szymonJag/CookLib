using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Comments;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Comments;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Comments
{
    public class DeleteCommentByIdHandler : IRequestHandler<DeleteCommentByIdRequest, DeleteCommentByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public DeleteCommentByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<DeleteCommentByIdResponse> Handle(DeleteCommentByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetCommentByIdQuery() { Id = request.Id };
            var toDelete = await this.queryExecutor.Execute(query);

            if (toDelete == null)
            {
                return new DeleteCommentByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var command = new DeleteCommentByIdCommand() { Parameter = toDelete };
            var deleted = await this.commandExecutor.Execute(command);

            return new DeleteCommentByIdResponse()
            {
                Data = this.mapper.Map<CommentDTO>(deleted)
            };
        }
    }
}

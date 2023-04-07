using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using CookLib.ApplicationServices.Components.Helpers;
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
        private readonly IHelperMethods helper;

        public DeleteCommentByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
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

            var isAbleToDelete = helper.IsAuthorOrAdmin(request.AuthenticatedUserId, toDelete.AuthorId, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new DeleteCommentByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new DeleteCommentByIdCommand() { Parameter = toDelete };
            var data = await this.commandExecutor.Execute(command);
            return new DeleteCommentByIdResponse()
            {
                Data = this.mapper.Map<CommentDTO>(data)
            };
        }
    }
}

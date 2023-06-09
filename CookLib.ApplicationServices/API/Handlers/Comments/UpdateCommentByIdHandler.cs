﻿using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using CookLib.ApplicationServices.Components.Helpers;
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
        private readonly IHelperMethods helper;

        public UpdateCommentByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
        }
        public async Task<UpdateCommentByIdResponse> Handle(UpdateCommentByIdRequest request, CancellationToken cancellationToken)
        {
            var commentRequest = this.mapper.Map<Comment>(request);
            var query = new GetCommentByIdQuery() { Id = request.Id };
            var commentFromDb = await this.queryExecutor.Execute(query);

            if (commentFromDb == null)
            {
                return new UpdateCommentByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var isAbleToDelete = helper.IsAuthorOrAdmin(request.AuthenticatedUserId, commentFromDb.AuthorId, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new UpdateCommentByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new UpdateCommentByIdCommand() { Parameter = commentRequest };
            var updated = await this.commandExecutor.Execute(command);
            return new UpdateCommentByIdResponse()
            {
                Data = this.mapper.Map<CommentDTO>(updated)
            };
        }
    }
}

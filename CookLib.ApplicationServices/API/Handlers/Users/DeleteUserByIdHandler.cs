﻿using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.ApplicationServices.API.Domain.Responses.User;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.User;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.User
{
    public class DeleteUserByIdHandler : IRequestHandler<DeleteUserByIdRequest, DeleteUserByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;
        private readonly IHelperMethods helper;

        public DeleteUserByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor, IHelperMethods helper)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
            this.helper = helper;
        }
        public async Task<DeleteUserByIdResponse> Handle(DeleteUserByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetUserByIdQuery() { Id = request.Id };
            var userToDelete = await this.queryExecutor.Execute(query);

            if (userToDelete == null)
            {
                return new DeleteUserByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var isAbleToDelete = this.helper.IsAuthorOrAdmin(request.AuthenticatedUserId, userToDelete.Id, request.AuthenticatedRole);

            if (!isAbleToDelete)
            {
                return new DeleteUserByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new DeleteUserByIdCommand() { Parameter = userToDelete };
            var deleted = await this.commandExecutor.Execute(command);

            return new DeleteUserByIdResponse()
            {
                Data = this.mapper.Map<UserDTO>(deleted)
            };
        }
    }
}

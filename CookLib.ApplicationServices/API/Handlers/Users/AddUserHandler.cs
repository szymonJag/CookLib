﻿using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.ApplicationServices.API.Domain.Responses.User;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.User;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.User
{
    public class AddUserHandler : IRequestHandler<AddUserRequest, AddUserResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public AddUserHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }
        public async Task<AddUserResponse> Handle(AddUserRequest request, CancellationToken cancellationToken)
        {
            var user = this.mapper.Map<DataAccess.Entities.User>(request);
            user.CreationDate = DateTime.UtcNow;

            var command = new AddUserCommand() { Parameter = user };
            var addedUser = await this.commandExecutor.Execute(command);

            if (addedUser == null)
            {
                return new AddUserResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }
            return new AddUserResponse()
            {
                Data = this.mapper.Map<UserDTO>(addedUser)
            };
        }
    }
}
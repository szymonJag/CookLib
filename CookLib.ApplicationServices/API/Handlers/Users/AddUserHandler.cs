using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.ApplicationServices.API.Domain.Responses.User;
using CookLib.ApplicationServices.Components.PasswordHasher;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.User;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.User
{
    public class AddUserHandler : IRequestHandler<AddUserRequest, AddUserResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IQueryExecutor queryExecutor;
        private readonly IHasher hasher;

        public AddUserHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor, IHasher hasher)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.queryExecutor = queryExecutor;
            this.hasher = hasher;
        }
        public async Task<AddUserResponse> Handle(AddUserRequest request, CancellationToken cancellationToken)
        {
            var queryByUsername = new GetUserQuery() { Name = request.Username };
            var userByUsername = await this.queryExecutor.Execute(queryByUsername);

            if (userByUsername != null)
            {
                return new AddUserResponse()
                {
                    Error = new ErrorModel("User with given username already exists!")
                };
            }

            // var queryByEmail = new GetUserByEmailQuery() { Name = request. };
            // var userByEmail = await this.queryExecutor.Execute(queryByEmail);

            // if (userByEmail != null)
            // {
            //     return new AddUserResponse()
            //     {
            //         Error = new ErrorModel("User with given email already exists!")
            //     };
            // }

            var user = this.mapper.Map<DataAccess.Entities.User>(request);
            user.Mail = "test@mail.gmail.com";
            user.Role = DataAccess.Entities.UserRole.Default;
            user.CreationDate = DateTime.UtcNow;
            user.Salt = this.hasher.SaltGenerator();
            user.HashedPassword = this.hasher.HashPassword(request.Password, user.Salt);

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

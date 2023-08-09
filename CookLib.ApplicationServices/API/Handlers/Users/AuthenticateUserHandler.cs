using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Users;
using CookLib.ApplicationServices.API.Domain.Responses.Users;
using CookLib.ApplicationServices.Components.PasswordHasher;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Users
{
    public class AuthenticateUserHandler : IRequestHandler<AuthenticateUserRequest, AuthenticateUserResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly IHasher hasher;

        public AuthenticateUserHandler(IMapper mapper, IQueryExecutor queryExecutor, IHasher hasher)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.hasher = hasher;
        }
        public async Task<AuthenticateUserResponse> Handle(AuthenticateUserRequest request, CancellationToken cancellationToken)
        {
            var query = new GetUserQuery() { Name = request.Username };
            var user = await this.queryExecutor.Execute(query);

            if (user == null)
            {
                return new AuthenticateUserResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var hashedPassword = this.hasher.HashPassword(request.Password, user.Salt);

            if (hashedPassword != user.HashedPassword)
            {
                return new AuthenticateUserResponse()
                {
                    Error = new ErrorModel($"{ErrorType.NotAuthenticated} - bad password")
                };
            }

            return new AuthenticateUserResponse()
            {
                Data = this.mapper.Map<UserDTO>(user)
            };
        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Users;
using CookLib.ApplicationServices.API.Domain.Responses.Users;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Users
{
    public class GetUserHandler : IRequestHandler<GetUserRequest, GetUserResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetUserHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetUserResponse> Handle(GetUserRequest request, CancellationToken cancellationToken)
        {
            var query = new GetUserQuery() { Name = request.Name };
            var user = await this.queryExecutor.Execute(query);

            if (user == null)
            {
                return new GetUserResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetUserResponse()
            {
                Data = this.mapper.Map<UserDTO>(user)
            };
        }
    }
}

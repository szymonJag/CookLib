using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.ApplicationServices.API.Domain.Responses.User;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.User
{
    public class GetUsersHandler : IRequestHandler<GetUsersRequest, GetUsersResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetUsersHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }

        public async Task<GetUsersResponse> Handle(GetUsersRequest request, CancellationToken cancellationToken)
        {
            var query = new GetUsersQuery() { Username = request.Username };
            var users = await this.queryExecutor.Execute(query);

            if (users == null)
            {
                return new GetUsersResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetUsersResponse()
            {
                Data = this.mapper.Map<List<UserDTO>>(users)
            };
        }
    }
}

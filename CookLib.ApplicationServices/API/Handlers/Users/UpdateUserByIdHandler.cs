using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Users;
using CookLib.ApplicationServices.API.Domain.Responses.Users;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Users;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Users
{
    public class UpdateUserByIdHandler : IRequestHandler<UpdateUserByIdRequest, UpdateUserByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public UpdateUserByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }

        public async Task<UpdateUserByIdResponse> Handle(UpdateUserByIdRequest request, CancellationToken cancellationToken)
        {

            var query = new GetUserByIdQuery() { Id = request.Id };
            var userFromDb = await this.queryExecutor.Execute(query);

            if (userFromDb == null)
            {
                return new UpdateUserByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var userRequest = this.mapper.Map<DataAccess.Entities.User>(request);
            userRequest.CreationDate = userFromDb.CreationDate;

            var command = new UpdateUserByIdCommand() { Parameter = userRequest };

            var updated = await this.commandExecutor.Execute(command);

            return new UpdateUserByIdResponse()
            {
                Data = this.mapper.Map<UserDTO>(updated)
            };

        }
    }
}

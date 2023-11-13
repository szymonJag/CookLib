using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Users;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Users;
using MediatR;

namespace CookLib.ApplicationServices;
public class ChangeUserRoleHandler : IRequestHandler<ChangeUserRoleRequest, ChangeUserRoleResponse>
{
    private readonly IMapper mapper;
    private readonly ICommandExecutor commandExecutor;
    private readonly IQueryExecutor queryExecutor;

    public ChangeUserRoleHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor)
    {
        this.mapper = mapper;
        this.commandExecutor = commandExecutor;
        this.queryExecutor = queryExecutor;
    }

    public async Task<ChangeUserRoleResponse> Handle(ChangeUserRoleRequest request, CancellationToken cancellationToken)
    {
        var query = new GetUserByIdQuery() { Id = request.UserId };
        var user = await this.queryExecutor.Execute(query);

        if (user == null)
        {
            return new ChangeUserRoleResponse() { Error = new ErrorModel(ErrorType.NotFound) };
        }

        user.Role = (user.Role == DataAccess.Entities.UserRole.Admin) ? DataAccess.Entities.UserRole.Default : DataAccess.Entities.UserRole.Admin;


        var command = new UpdateUserByIdCommand() { Parameter = user };
        var updated = await this.commandExecutor.Execute(command);

        return new ChangeUserRoleResponse()
        {
            Data = this.mapper.Map<UserDTO>(updated)
        };
    }
}

using System.Data.Common;
using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess;
using CookLib.DataAccess.CQRS.Queries;
using MediatR;

namespace CookLib.ApplicationServices;
public class GetRecipesCreatedByUserIdHandler : IRequestHandler<GetRecipesCreatedByUserIdRequest, GetRecipesCreatedByUserIdResponse>
{
    private readonly IMapper mapper;
    private readonly IQueryExecutor queryExecutor;

    public GetRecipesCreatedByUserIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
    {
        this.mapper = mapper;
        this.queryExecutor = queryExecutor;
    }

    public async Task<GetRecipesCreatedByUserIdResponse> Handle(GetRecipesCreatedByUserIdRequest request, CancellationToken cancellationToken)
    {
        var query = new GetRecipesCreatedByUserIdQuery() { UserId = request.Id };
        var createdRecipesIds = await this.queryExecutor.Execute(query);

        if (createdRecipesIds.Count == 0)
        {
            return new GetRecipesCreatedByUserIdResponse() { Error = new ErrorModel(ErrorType.NotFound) };
        }

        var createdRecipesQuery = new GetRecipesByIdsQuery() { Ids = createdRecipesIds };
        var created = this.queryExecutor.Execute(createdRecipesQuery);

        return new GetRecipesCreatedByUserIdResponse()
        {
            Data = this.mapper.Map<List<ShortRecipeDTO>>(created)
        };
    }
}

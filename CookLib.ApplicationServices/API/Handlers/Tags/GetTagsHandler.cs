using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Tags;
using CookLib.ApplicationServices.API.Domain.Responses.Tags;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Tags;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Tags
{
    public class GetTagsHandler : IRequestHandler<GetTagsRequest, GetTagsResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetTagsHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetTagsResponse> Handle(GetTagsRequest request, CancellationToken cancellationToken)
        {
            var query = new GetTagsQuery() { Name = request.Name };
            var tags = await this.queryExecutor.Execute(query);

            if (tags == null)
            {
                return new GetTagsResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetTagsResponse()
            {
                Data = this.mapper.Map<List<TagDTO>>(tags)
            };
        }
    }
}

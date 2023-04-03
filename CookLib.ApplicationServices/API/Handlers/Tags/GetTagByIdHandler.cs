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
    public class GetTagByIdHandler : IRequestHandler<GetTagByIdRequest, GetTagByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetTagByIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetTagByIdResponse> Handle(GetTagByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetTagByIdQuery() { Id = request.Id };
            var tag = await this.queryExecutor.Execute(query);

            if (tag == null)
            {
                return new GetTagByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetTagByIdResponse()
            {
                Data = this.mapper.Map<TagDTO>(tag)
            };
        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.ApplicationServices.API.Domain.Responses.Comments;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Comments;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Comments
{
    public class GetAllCommentsByRecipeIdHandler : IRequestHandler<GetAllCommentsByRecipeIdRequest, GetAllCommentsByRecipeIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;

        public GetAllCommentsByRecipeIdHandler(IMapper mapper, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
        }
        public async Task<GetAllCommentsByRecipeIdResponse> Handle(GetAllCommentsByRecipeIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetAllCommentsByRecipeIdQuery() { RecipeId = request.Id };
            var comments = await this.queryExecutor.Execute(query);

            if (comments == null)
            {
                return new GetAllCommentsByRecipeIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new GetAllCommentsByRecipeIdResponse()
            {
                Data = this.mapper.Map<List<CommentDTO>>(comments)
            };
        }
    }
}

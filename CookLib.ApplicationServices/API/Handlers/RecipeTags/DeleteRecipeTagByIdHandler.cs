using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeTags;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeTags;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.RecipeTags;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeTags
{
    public class DeleteRecipeTagByIdHandler : IRequestHandler<DeleteRecipeTagByIdRequest, DeleteRecipeTagByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public DeleteRecipeTagByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<DeleteRecipeTagByIdResponse> Handle(DeleteRecipeTagByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetRecipeTagByIdQuery() { Id = request.Id };
            var toDelete = await this.queryExecutor.Execute(query);

            if (toDelete == null)
            {
                return new DeleteRecipeTagByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            var command = new DeleteRecipeTagByIdCommand() { Parameter = toDelete };
            var deleted = await this.commandExecutor.Execute(command);

            return new DeleteRecipeTagByIdResponse()
            {
                Data = this.mapper.Map<RecipeTagDTO>(toDelete)
            };
        }
    }
}

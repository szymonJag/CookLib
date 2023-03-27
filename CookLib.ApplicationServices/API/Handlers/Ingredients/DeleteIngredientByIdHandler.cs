using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Ingredients;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Ingredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Ingredients
{
    public class DeleteIngredientByIdHandler : IRequestHandler<DeleteIngredientByIdRequest, DeleteIngredientByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly IQueryExecutor queryExecutor;
        private readonly ICommandExecutor commandExecutor;

        public DeleteIngredientByIdHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.queryExecutor = queryExecutor;
            this.commandExecutor = commandExecutor;
        }
        public async Task<DeleteIngredientByIdResponse> Handle(DeleteIngredientByIdRequest request, CancellationToken cancellationToken)
        {
            var query = new GetIngredientByIdQuery() { Id = request.Id };
            var ingredientToDelete = await this.queryExecutor.Execute(query);

            var command = new DeleteIngredientByIdCommand() { Parameter = ingredientToDelete };
            var deleted = await this.commandExecutor.Execute(command);

            return new DeleteIngredientByIdResponse
            {
                Data = this.mapper.Map<IngredientDTO>(deleted)
            };
        }
    }
}

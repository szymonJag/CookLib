using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Ingredients;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Ingredients;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Ingredients
{
    public class UpdateIngredientByIdHandler : IRequestHandler<UpdateIngredientByIdRequest, UpdateIngredientByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IQueryExecutor queryExecutor;

        public UpdateIngredientByIdHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.queryExecutor = queryExecutor;
        }
        public async Task<UpdateIngredientByIdResponse> Handle(UpdateIngredientByIdRequest request, CancellationToken cancellationToken)
        {
            var ingrToUpdate = this.mapper.Map<Ingredient>(request);

            var query = new GetIngredientByIdQuery() { Id = ingrToUpdate.Id };
            var ingredientToUpdate = await this.queryExecutor.Execute(query);

            if (ingredientToUpdate == null)
            {
                return new UpdateIngredientByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            if (request.AuthenticatedRole != UserRole.Admin.ToString())
            {
                return new UpdateIngredientByIdResponse()
                {
                    Error = new ErrorModel(ErrorType.Unauthorized)
                };
            }

            var command = new UpdateIngredientByIdCommand() { Parameter = ingrToUpdate };
            var updated = await this.commandExecutor.Execute(command);

            return new UpdateIngredientByIdResponse()
            {
                Data = this.mapper.Map<IngredientDTO>(updated)
            };
        }
    }
}

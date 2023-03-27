using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Ingredients;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Ingredients
{
    public class UpdateIngredientByIdHandler : IRequestHandler<UpdateIngredientByIdRequest, UpdateIngredientByIdResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public UpdateIngredientByIdHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }
        public async Task<UpdateIngredientByIdResponse> Handle(UpdateIngredientByIdRequest request, CancellationToken cancellationToken)
        {
            var ingrToUpdate = this.mapper.Map<Ingredient>(request);
            var command = new UpdateIngredientByIdCommand() { Parameter = ingrToUpdate };
            var updated = await this.commandExecutor.Execute(command);

            return new UpdateIngredientByIdResponse()
            {
                Data = this.mapper.Map<IngredientDTO>(updated)
            };
        }
    }
}

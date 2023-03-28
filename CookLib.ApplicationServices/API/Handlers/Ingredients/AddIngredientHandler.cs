using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Ingredients;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.Ingredients
{
    public class AddIngredientHandler : IRequestHandler<AddIngredientRequest, AddIngredientResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public AddIngredientHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }

        public async Task<AddIngredientResponse> Handle(AddIngredientRequest request, CancellationToken cancellationToken)
        {
            var ingredient = mapper.Map<Ingredient>(request);
            var command = new AddIngredientCommand() { Parameter = ingredient };
            var ingredientDb = await commandExecutor.Execute(command);

            if (ingredientDb == null)
            {
                return new AddIngredientResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new AddIngredientResponse()
            {
                Data = mapper.Map<IngredientDTO>(ingredientDb)
            };
        }
    }
}

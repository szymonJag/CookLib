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
    public class AddIngredientHandler : IRequestHandler<AddIngredientRequest, AddIngredientResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IQueryExecutor queryExecutor;

        public AddIngredientHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.queryExecutor = queryExecutor;
        }

        public async Task<AddIngredientResponse> Handle(AddIngredientRequest request, CancellationToken cancellationToken)
        {
            var query = new GetIngredientsQuery() { Name = request.Name };
            var fromDb = await this.queryExecutor.Execute(query);

            if (fromDb.Any())
            {
                return new AddIngredientResponse()
                {
                    Error = new ErrorModel("Ingredient with given name already exists!")
                };
            }

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

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeIngredients;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeIngredients
{
    public class AddRecipeIngredientHandler : IRequestHandler<AddRecipeIngredientRequest, AddRecipeIngredientResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public AddRecipeIngredientHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }
        public async Task<AddRecipeIngredientResponse> Handle(AddRecipeIngredientRequest request, CancellationToken cancellationToken)
        {
            var recipeIngredient = this.mapper.Map<RecipeIngredient>(request);
            var command = new AddRecipeIngredientCommand()
            {
                Parameter = recipeIngredient
            };

            var addedRecipeIngredient = await this.commandExecutor.Execute(command);

            if (addedRecipeIngredient == null)
            {
                return new AddRecipeIngredientResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new AddRecipeIngredientResponse()
            {
                Data = this.mapper.Map<AddRecipeIngredientRequest>(addedRecipeIngredient)
            };
        }
    }
}

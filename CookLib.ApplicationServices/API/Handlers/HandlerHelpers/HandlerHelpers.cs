using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices;
public class HandlerHelpers : IHandlerHelpers
{
    private readonly IMapper mapper;
    private readonly IQueryExecutor queryExecutor;
    private readonly ICommandExecutor commandExecutor;

    public HandlerHelpers(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
    {
        this.mapper = mapper;
        this.queryExecutor = queryExecutor;
        this.commandExecutor = commandExecutor;
    }



    public async void AddIngredientsToDb(List<RecipeIngredientRequestDTO> recipeIngredients, int recipeId)
    {
        foreach (var ingredient in recipeIngredients)
        {
            var mappedIngredient = this.mapper.Map<RecipeIngredient>(ingredient);
            mappedIngredient.RecipeId = recipeId;
            var commandAddRecipeIngredient = new AddRecipeIngredientCommand() { Parameter = mappedIngredient };
            await commandExecutor.Execute(commandAddRecipeIngredient);
        }
    }
}

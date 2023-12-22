using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.Recipes;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices;
public class ChangeRecipeStatusHandler : IRequestHandler<ChangeRecipeStatusRequest, ChangeRecipeStatusResponse>
{
    private readonly IMapper mapper;
    private readonly IQueryExecutor queryExecutor;
    private readonly ICommandExecutor commandExecutor;

    public ChangeRecipeStatusHandler(IMapper mapper, IQueryExecutor queryExecutor, ICommandExecutor commandExecutor)
    {
        this.mapper = mapper;
        this.queryExecutor = queryExecutor;
        this.commandExecutor = commandExecutor;
    }

    public async Task<ChangeRecipeStatusResponse> Handle(ChangeRecipeStatusRequest request, CancellationToken cancellationToken)
    {
        var query = new GetRecipeByIdQuery() { Id = request.RecipeId };
        var recipe = await this.queryExecutor.Execute(query);

        if (recipe == null)
        {
            return new ChangeRecipeStatusResponse()
            {
                Error = new ErrorModel(ErrorType.NotFound)
            };
        }

        recipe.Status = request.NewStatus;

        var recipeStatusModel = new ChangeRecipeStatusModel() { RecipeId = request.RecipeId, NewRecipeStatus = request.NewStatus };

        var command = new ChangeRecipeStatusCommand() { Parameter = recipeStatusModel };
        var updatedRecipe = await this.commandExecutor.Execute(command);

        return new ChangeRecipeStatusResponse()
        {
            Data = updatedRecipe
        };
    }
}



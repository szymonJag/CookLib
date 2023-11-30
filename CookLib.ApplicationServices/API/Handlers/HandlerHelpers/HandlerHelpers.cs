using System.Reflection.Metadata;
using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.PreparationSteps;
using CookLib.DataAccess.CQRS.Commands.RecipeIngredients;
using CookLib.DataAccess.CQRS.Commands.RecipeTags;
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

    public async void AddRecipeIngredientsToDb(List<RecipeIngredientRequestDTO> recipeIngredients, int recipeId)
    {
        foreach (var ingredient in recipeIngredients)
        {
            var mappedIngredient = this.mapper.Map<RecipeIngredient>(ingredient);
            mappedIngredient.RecipeId = recipeId;
            var commandAddRecipeIngredient = new AddRecipeIngredientCommand() { Parameter = mappedIngredient };
            await commandExecutor.Execute(commandAddRecipeIngredient);
        }
    }

    public async void AddRecipePreparationStepsToDb(List<PreparationStepRequestDTO> preparationSteps, int recipeId)
    {
        foreach (var step in preparationSteps)
        {
            var mappedPreparationStep = this.mapper.Map<DataAccess.Entities.PreparationStep>(step);
            mappedPreparationStep.RecipeId = recipeId;
            var commandAddPreparationStep = new AddPreparationStepCommand() { Parameter = mappedPreparationStep };
            await commandExecutor.Execute(commandAddPreparationStep);
        }
    }

    public async void AddRecipeTagsToDb(List<int> recipeTags, int recipeId)
    {
        foreach (var tag in recipeTags)
        {
            var recipeTag = new RecipeTag() { RecipeId = recipeId, TagId = Convert.ToInt32(tag) };
            var commandAddRecipeTag = new AddRecipeTagCommand() { Parameter = recipeTag };
            await commandExecutor.Execute(commandAddRecipeTag);
        }
    }

    public async void DeleteRecipeIngredientsFromDb(List<RecipeIngredient> recipeIngredients)
    {
        foreach (var ingredient in recipeIngredients)
        {
            var deleteIngredientCommand = new DeleteRecipeIngredientByIdCommand() { Parameter = ingredient };
            await this.commandExecutor.Execute(deleteIngredientCommand);
        }
    }

    public async void DeleteRecipePreparationStepsFromDb(List<PreparationStep> preparationSteps)
    {
        foreach (var step in preparationSteps)
        {
            var deletePreparationStepCommand = new DeletePreparationStepByIdCommand() { Parameter = step };
            await this.commandExecutor.Execute(deletePreparationStepCommand);
        }
    }

    public async void DeleteRecipeTagsFromDb(List<RecipeTag> recipeTags)
    {
        foreach (var recipeTag in recipeTags)
        {
            var deleteTagCommand = new DeleteRecipeTagByIdCommand() { Parameter = recipeTag };
            await this.commandExecutor.Execute(deleteTagCommand);
        }
    }
}

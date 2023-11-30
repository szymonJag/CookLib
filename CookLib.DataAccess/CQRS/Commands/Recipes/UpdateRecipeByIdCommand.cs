using System.Security.Cryptography.X509Certificates;
using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Commands.Recipes
{
    public class UpdateRecipeByIdCommand : CommandBase<Entities.Recipe, Entities.Recipe>
    {
        public override async Task<Entities.Recipe> Execute(CookLibContext context)
        {
            var recipe = this.Parameter;

            var newRecipeTags = recipe.RecipeTags;
            var tagsFromDb = await context.RecipeTags.Where(x => x.RecipeId == recipe.Id).ToListAsync();

            var newRecipeSteps = recipe.PreparationSteps;
            var recipeStepsFromDb = await context.PreparationSteps.Where(x => x.RecipeId == recipe.Id).ToListAsync();

            var newRecipeIngredients = recipe.Ingredients;
            var recipeIngredientsFromDb = await context.RecipeIngredients.Where(x => x.RecipeId == recipe.Id).ToListAsync();

            if (!newRecipeIngredients.SequenceEqual(recipeIngredientsFromDb))
            {
                foreach (var ingredient in recipeIngredientsFromDb)
                {
                    context.RecipeIngredients.Remove(ingredient);
                }

                foreach (var ingredient in newRecipeIngredients)
                {
                    context.RecipeIngredients.Add(ingredient);
                }
            }


            if (!newRecipeTags.SequenceEqual(tagsFromDb))
            {
                foreach (var recipeTag in tagsFromDb)
                {
                    context.RecipeTags.Remove(recipeTag);
                }

                foreach (var recipeTag in newRecipeTags)
                {
                    var newRecipeTag = new RecipeTag()
                    {
                        RecipeId = recipeTag.RecipeId,
                        TagId = recipeTag.TagId,
                    };
                    await context.RecipeTags.AddAsync(newRecipeTag);
                }
            }

            if (!newRecipeSteps.SequenceEqual(recipeStepsFromDb))
            {
                foreach (var step in recipeStepsFromDb)
                {
                    context.PreparationSteps.Remove(step);
                }

                foreach (var step in newRecipeSteps)
                {
                    step.RecipeId = recipe.Id;
                    await context.PreparationSteps.AddAsync(step);
                }
            }


            context.Recipes.Update(recipe);
            await context.SaveChangesAsync();

            var updatedRecipe = await context.Recipes.FirstOrDefaultAsync(x => x.Id == recipe.Id);

            return updatedRecipe;
        }
    }
}

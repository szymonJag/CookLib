﻿using CookLib.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace CookLib.DataAccess.CQRS.Queries.Recipes
{
  public class GetRecipesQuery : QueryBase<List<Recipe>>
  {
    public string Name { get; set; }
    public RecipeStatus Status { get; set; }

    public override async Task<List<Recipe>> Execute(CookLibContext context)
    {
      var query = context.Recipes
          .Include(x => x.Ingredients)
              .ThenInclude(x => x.Ingredient)
          .Include(x => x.PreparationSteps.OrderBy(x => x.Step))
          .Include(x => x.Comments)
              .ThenInclude(x => x.Author)
          .Include(x => x.RecipeTags)
              .ThenInclude(x => x.Tag)
          .Include(x => x.Author)
          .Include(x => x.Images)
          .AsNoTracking();

      if (!string.IsNullOrEmpty(Name))
      {
        query = query.Where(x => x.Name.ToLower().Contains(Name.ToLower()));
      }

      if (Status != RecipeStatus.Wszystkie)
      {
        query = query.Where(x => x.Status == Status);
      }

      var recipes = await query.ToListAsync();

      return recipes;
    }
  }
}

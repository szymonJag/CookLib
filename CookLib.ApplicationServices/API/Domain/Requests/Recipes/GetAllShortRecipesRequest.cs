﻿using CookLib.ApplicationServices.API.Domain.Responses.Recipes;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Recipes
{
    public class GetAllShortRecipesRequest : RequestBase, IRequest<GetAllShortRecipesResponse>
    {
        public string Name { get; set; }
        public RecipeStatus Status { get; set; }
    }
}

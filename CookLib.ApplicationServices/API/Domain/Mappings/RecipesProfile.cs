﻿using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Recipes;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class RecipesProfile : Profile
    {
        public RecipesProfile()
        {
            CreateMap<Recipe, RecipeDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ForMember(x => x.ServingSize, y => y.MapFrom(z => z.ServingSize))
                .ForMember(x => x.PreparationTime, y => y.MapFrom(z => z.PreparationTime))
                .ForMember(x => x.CreateDate, y => y.MapFrom(z => z.CreateDate))
                .ForMember(x => x.Ingredients, y => y.MapFrom(z => z.Ingredients))
                .ForMember(x => x.PreparationSteps, y => y.MapFrom(z => z.PreparationSteps))
                .ForMember(x => x.Comments, y => y.MapFrom(z => z.Comments))
                .ForMember(x => x.RecipeTags, y => y.MapFrom(z => z.RecipeTags))
                .ForMember(x => x.Author, y => y.MapFrom(y => y.Author))
                .ReverseMap();

            CreateMap<Recipe, AddRecipeRequest>()
                .ForMember(x => x.AuthorId, y => y.MapFrom(z => z.AuthorId))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ForMember(x => x.PreparationTime, y => y.MapFrom(z => z.PreparationTime))
                .ForMember(x => x.ServingSize, y => y.MapFrom(z => z.ServingSize))
                .ReverseMap();

            CreateMap<Recipe, UpdateRecipeByIdRequest>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.ServingSize, y => y.MapFrom(z => z.ServingSize))
                .ForMember(x => x.PreparationTime, y => y.MapFrom(z => z.PreparationTime))
                .ForMember(x => x.CreationDate, y => y.MapFrom(z => z.CreateDate))
                .ForMember(x => x.AuthorId, y => y.MapFrom(z => z.AuthorId))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ReverseMap();

            CreateMap<Recipe, UserFavouriteRecipesDTO>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name));
        }
    }
}

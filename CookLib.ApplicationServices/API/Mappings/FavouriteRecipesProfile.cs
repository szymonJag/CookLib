using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class FavouriteRecipesProfile : Profile
    {
        public FavouriteRecipesProfile()
        {
            this.CreateMap<FavouriteRecipeDTO, FavouriteRecipe>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.UserId, y => y.MapFrom(z => z.UserId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ReverseMap();

            this.CreateMap<AddFavouriteRecipeRequest, FavouriteRecipe>()
                .ForMember(x => x.UserId, y => y.MapFrom(z => z.UserId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ReverseMap();

            this.CreateMap<UpdateFavouriteRecipeByIdRequest, FavouriteRecipe>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.UserId, y => y.MapFrom(z => z.UserId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ReverseMap();

            this.CreateMap<FavouriteRecipe, UserFavouriteRecipesDTO>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Recipe.Name))
                .ReverseMap();

        }
    }
}

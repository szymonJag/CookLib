using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.FavouriteRecipes;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class FavouriteRecipesProfile : Profile
    {
        public FavouriteRecipesProfile()
        {
            CreateMap<FavouriteRecipeDTO, FavouriteRecipe>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.UserId, y => y.MapFrom(z => z.UserId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ReverseMap();

            CreateMap<ToggleFavouriteRecipeRequest, FavouriteRecipe>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ReverseMap();

            CreateMap<FavouriteRecipe, UserFavouriteRecipesDTO>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Recipe.Name))
                .ReverseMap();

        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class RecipeIngredientsProfile : Profile
    {
        public RecipeIngredientsProfile()
        {
            this.CreateMap<RecipeIngredient, RecipeIngredientDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Ingredient.Name))
                .ForMember(x => x.Measurement, y => y.MapFrom(z => z.Measurement.ToString()))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ForMember(x => x.Kcal, y => y.MapFrom(z => z.Ingredient.Kcal))
                .ForMember(x => x.Type, y => y.MapFrom(z => z.Ingredient.Type.ToString()));

            this.CreateMap<AddRecipeIngredientRequest, RecipeIngredient>()
                .ForMember(x => x.IngredientId, y => y.MapFrom(z => z.IngredientId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ForMember(x => x.Measurement, y => y.MapFrom(z => z.Measurement))
                .ReverseMap();

            this.CreateMap<UpdateRecipeIngredientByIdRequest, RecipeIngredient>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.IngredientId, y => y.MapFrom(z => z.IngredientId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ForMember(x => x.Measurement, y => y.MapFrom(z => z.Measurement));
        }
    }
}

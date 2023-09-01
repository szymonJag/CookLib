using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeIngredients;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class RecipeIngredientsProfile : Profile
    {
        public RecipeIngredientsProfile()
        {
            CreateMap<RecipeIngredient, RecipeIngredientDTO>()
                .ForMember(x => x.Measurement, y => y.MapFrom(z => z.Measurement.ToString()))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ForMember(x => x.Ingredient, y => y.MapFrom(z => z.Ingredient));

            CreateMap<RecipeIngredient, RecipeIngredientRequestDTO>()
                .ForMember(x => x.IngredientId, y => y.MapFrom(z => z.IngredientId))
                .ForMember(x => x.MeasurementTypeId, y => y.MapFrom(z => z.Measurement))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ReverseMap();


            CreateMap<AddRecipeIngredientRequest, RecipeIngredient>()
                .ForMember(x => x.IngredientId, y => y.MapFrom(z => z.IngredientId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ForMember(x => x.Measurement, y => y.MapFrom(z => z.Measurement))
                .ReverseMap();

            CreateMap<UpdateRecipeIngredientByIdRequest, RecipeIngredient>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.IngredientId, y => y.MapFrom(z => z.IngredientId))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ForMember(x => x.Measurement, y => y.MapFrom(z => z.Measurement));
        }
    }
}

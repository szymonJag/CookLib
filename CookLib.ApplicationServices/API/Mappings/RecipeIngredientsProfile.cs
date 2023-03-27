using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
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
                .ForMember(x => x.Measurement, y => y.MapFrom(z => z.Measurement))
                .ForMember(x => x.Amount, y => y.MapFrom(z => z.Amount))
                .ForMember(x => x.Kcal, y => y.MapFrom(z => z.Ingredient.Kcal))
                .ForMember(x => x.Type, y => y.MapFrom(z => z.Ingredient.Type));
        }
    }
}

using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class IngredientsProfile : Profile
    {
        public IngredientsProfile()
        {
            this.CreateMap<Ingredient, IngredientDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ForMember(x => x.Kcal, y => y.MapFrom(z => z.Kcal))
                .ForMember(x => x.Type, z => z.MapFrom(y => y.Type))
                .ReverseMap();

            this.CreateMap<AddIngredientRequest, Ingredient>()
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ForMember(x => x.Kcal, y => y.MapFrom(z => z.Kcal))
                .ForMember(x => x.Type, z => z.MapFrom(y => y.Type))
                .ReverseMap();
        }
    }
}

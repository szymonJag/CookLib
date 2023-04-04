using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Ingredients;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class IngredientsProfile : Profile
    {
        public IngredientsProfile()
        {
            CreateMap<Ingredient, IngredientDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ForMember(x => x.Kcal, y => y.MapFrom(z => z.Kcal))
                .ForMember(x => x.Type, z => z.MapFrom(y => y.Type))
                .ReverseMap();

            CreateMap<AddIngredientRequest, Ingredient>()
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ForMember(x => x.Kcal, y => y.MapFrom(z => z.Kcal))
                .ForMember(x => x.Type, z => z.MapFrom(y => y.Type))
                .ReverseMap();

            CreateMap<UpdateIngredientByIdRequest, Ingredient>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ForMember(x => x.Kcal, y => y.MapFrom(z => z.Kcal))
                .ForMember(x => x.Type, y => y.MapFrom(z => z.Type))
                .ReverseMap();
        }
    }
}

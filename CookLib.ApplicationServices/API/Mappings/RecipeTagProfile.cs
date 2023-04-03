using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class RecipeTagProfile : Profile
    {
        public RecipeTagProfile()
        {
            this.CreateMap<RecipeTag, RecipeTagDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Tag.Name))
                .ReverseMap();
        }
    }
}

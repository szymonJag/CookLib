using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class TagsProfile : Profile
    {
        public TagsProfile()
        {
            CreateMap<Tag, TagDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Name, y => y.MapFrom(z => z.Name))
                .ReverseMap();

        }
    }
}

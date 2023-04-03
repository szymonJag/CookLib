using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeTags;
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

            this.CreateMap<AddRecipeTagRequest, RecipeTag>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.TagId, y => y.MapFrom(z => z.TagId));
        }
    }
}

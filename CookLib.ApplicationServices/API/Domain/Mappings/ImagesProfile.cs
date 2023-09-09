using AutoMapper;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class ImagesProfile : Profile
    {
        public ImagesProfile()
        {
            //CreateMap<Image, Models.ImageDTO>()
            //    .ForMember(x => x.ImageBase64, y =>
            //    {
            //        y.MapFrom(z => Convert.ToBase64String(z.ImageContent));
            //    })
            //    .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
            //    .ReverseMap();


        }
    }
}

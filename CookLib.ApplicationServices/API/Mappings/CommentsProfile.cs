using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class CommentsProfile : Profile
    {
        public CommentsProfile()
        {
            this.CreateMap<Comment, CommentDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Author, y => y.MapFrom(z => z.Author))
                .ForMember(x => x.CreationDate, y => y.MapFrom(z => z.CreationDate))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description))
                .ReverseMap();
        }
    }
}

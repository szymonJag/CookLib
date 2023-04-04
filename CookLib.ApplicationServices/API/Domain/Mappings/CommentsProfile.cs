using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Domain.Mappings
{
    public class CommentsProfile : Profile
    {
        public CommentsProfile()
        {
            CreateMap<Comment, CommentDTO>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Author, y => y.MapFrom(z => z.Author))
                .ForMember(x => x.CreationDate, y => y.MapFrom(z => z.CreationDate))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description))
                .ReverseMap();

            CreateMap<AddCommentRequest, Comment>()
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.AuthorId, y => y.MapFrom(z => z.AuthorId))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description))
                .ReverseMap();

            CreateMap<UpdateCommentByIdRequest, Comment>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.RecipeId, y => y.MapFrom(z => z.RecipeId))
                .ForMember(x => x.AuthorId, y => y.MapFrom(z => z.AuthorId))
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Description))
                .ReverseMap(); ;
        }
    }
}

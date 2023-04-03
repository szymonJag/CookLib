using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.ApplicationServices.API.Domain.Requests.Users;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            this.CreateMap<User, UserDTO>()
                .ForMember(x => x.Mail, y => y.MapFrom(z => z.Mail))
                .ForMember(x => x.Username, y => y.MapFrom(z => z.Username))
                .ForMember(x => x.Role, y => y.MapFrom(z => z.Role.ToString()))
                .ForMember(x => x.CreationDate, y => y.MapFrom(z => z.CreationDate))
                .ForMember(x => x.Favourites, y => y.MapFrom(z => z.Favourites.Select(fr => new UserFavouriteRecipesDTO
                {
                    RecipeId = fr.RecipeId,
                    Name = fr.Recipe.Name
                }).ToList()))
                .ReverseMap();

            CreateMap<FavouriteRecipe, UserFavouriteRecipesDTO>()
        .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Recipe.Name));


            this.CreateMap<AddUserRequest, User>()
                .ForMember(x => x.Mail, y => y.MapFrom(z => z.Mail))
                .ForMember(x => x.Username, y => y.MapFrom(z => z.Username))
                .ForMember(x => x.Password, y => y.MapFrom(z => z.Password))
                .ForMember(x => x.Role, y => y.MapFrom(z => z.Role));


            this.CreateMap<UpdateUserByIdRequest, User>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Mail, y => y.MapFrom(z => z.Mail))
                .ForMember(x => x.Username, y => y.MapFrom(z => z.Username))
                .ForMember(x => x.Password, y => y.MapFrom(z => z.Password))
                .ForMember(x => x.Role, y => y.MapFrom(z => z.Role))
                .ReverseMap();


            this.CreateMap<AuthorDTO, User>()
                .ForMember(x => x.Id, y => y.MapFrom(z => z.Id))
                .ForMember(x => x.Username, y => y.MapFrom(z => z.Username))
                .ReverseMap();
        }
    }
}

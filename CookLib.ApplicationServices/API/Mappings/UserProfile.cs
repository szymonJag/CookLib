using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.User;
using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.API.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            this.CreateMap<UserDTO, User>()
                .ForMember(x => x.Mail, y => y.MapFrom(z => z.Mail))
                .ForMember(x => x.Username, y => y.MapFrom(z => z.Username))
                .ForMember(x => x.Role, y => y.MapFrom(z => z.Role.ToString()))
                .ForMember(x => x.CreationDate, y => y.MapFrom(z => z.CreationDate))
                .ReverseMap();

            this.CreateMap<AddUserRequest, User>()
                .ForMember(x => x.Mail, y => y.MapFrom(z => z.Mail))
                .ForMember(x => x.Username, y => y.MapFrom(z => z.Username))
                .ForMember(x => x.Password, y => y.MapFrom(z => z.Password))
                .ForMember(x => x.Role, y => y.MapFrom(z => z.Role));
        }
    }
}

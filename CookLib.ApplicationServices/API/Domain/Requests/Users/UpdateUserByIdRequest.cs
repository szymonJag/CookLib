using CookLib.ApplicationServices.API.Domain.Responses.Users;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Users
{
    public class UpdateUserByIdRequest : RequestBase, IRequest<UpdateUserByIdResponse>
    {
        public int Id;
        public string Mail { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public DateTime CreationDate { get; set; }
        public UserRole Role { get; set; }
    }
}

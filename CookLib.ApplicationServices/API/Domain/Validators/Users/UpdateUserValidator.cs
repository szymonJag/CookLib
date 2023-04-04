using CookLib.ApplicationServices.API.Domain.Requests.Users;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Users
{
    public class UpdateUserValidator : AbstractValidator<UpdateUserByIdRequest>
    {
        public UpdateUserValidator()
        {
            RuleFor(x => x.Mail).EmailAddress();
            RuleFor(x => x.Password).Length(6, 20);
            RuleFor(x => x.Username).Length(4, 20);
            RuleFor(x => x.Role).NotEmpty();
        }
    }
}

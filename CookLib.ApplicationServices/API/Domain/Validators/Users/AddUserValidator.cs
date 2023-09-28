using CookLib.ApplicationServices.API.Domain.Requests.User;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Users
{
    public class AddUserValidator : AbstractValidator<AddUserRequest>
    {
        public AddUserValidator()
        {
            // RuleFor(x => x.Mail).EmailAddress();
            RuleFor(x => x.Password).Length(6, 20);
            RuleFor(x => x.Username).Length(4, 20);
        }
    }
}

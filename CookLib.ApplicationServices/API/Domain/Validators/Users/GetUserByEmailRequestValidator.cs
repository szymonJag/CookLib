using CookLib.ApplicationServices.API.Domain.Requests.Users;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Users
{
    public class GetUserByEmailRequestValidator : AbstractValidator<GetUserByEmailRequest>
    {
        public GetUserByEmailRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("You should give email");
        }
    }
}

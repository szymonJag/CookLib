using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Comments
{
    public class AddCommentValidator : AbstractValidator<AddCommentRequest>
    {
        public AddCommentValidator()
        {
            RuleFor(x => x.AuthorId).NotEmpty();
            RuleFor(x => x.RecipeId).NotEmpty();
            RuleFor(x => x.Description).Length(1, 300);
        }
    }
}

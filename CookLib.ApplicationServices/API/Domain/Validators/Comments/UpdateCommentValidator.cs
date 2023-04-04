using CookLib.ApplicationServices.API.Domain.Requests.Comments;
using FluentValidation;

namespace CookLib.ApplicationServices.API.Domain.Validators.Comments
{
    public class UpdateCommentValidator : AbstractValidator<UpdateCommentByIdRequest>
    {
        public UpdateCommentValidator()
        {
            RuleFor(x => x.AuthorId).NotEmpty();
            RuleFor(x => x.RecipeId).NotEmpty();
            RuleFor(x => x.Description).Length(1, 300);
        }
    }
}

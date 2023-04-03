using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.RecipeTags
{
    public class DeleteRecipeTagByIdRequest : IRequest<DeleteRecipeTagByIdResponse>
    {
        public int Id { get; set; }
    }
}

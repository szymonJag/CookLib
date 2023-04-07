using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.RecipeTags
{
    public class GetRecipeTagsByRecipeIdRequest : RequestBase, IRequest<GetRecipeTagsByRecipeIdResponse>
    {
        public int Id { get; set; }
    }
}

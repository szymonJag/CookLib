using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Ingredients
{
    public class GetIngredientsRequest : RequestBase, IRequest<GetIngredientsResponse>
    {
        public string Name { get; set; }
    }
}

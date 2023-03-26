using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Ingredients
{
    public class GetIngredientByIdRequest : IRequest<GetIngredientByIdResponse>
    {
        public int Id { get; set; }
    }
}

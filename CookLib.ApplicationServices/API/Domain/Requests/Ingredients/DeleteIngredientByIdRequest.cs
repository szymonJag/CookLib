using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Ingredients
{
    public class DeleteIngredientByIdRequest : RequestBase, IRequest<DeleteIngredientByIdResponse>
    {
        public int Id { get; set; }

    }
}

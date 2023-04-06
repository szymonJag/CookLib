using CookLib.ApplicationServices.API.Domain.Responses.Ingredients;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.Ingredients
{
    public class UpdateIngredientByIdRequest : RequestBase, IRequest<UpdateIngredientByIdResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Kcal { get; set; }
        public IngredientType Type { get; set; }
    }
}

using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps
{
    public class UpdatePreparationStepByIdRequest : IRequest<UpdatePreparationStepByIdResponse>
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public int Step { get; set; }
        public string Description { get; set; }
    }
}

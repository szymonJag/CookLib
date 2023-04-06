using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps
{
    public class GetAllPreparationStepsByRecipeIdRequest : RequestBase, IRequest<GetAllPreparationStepsByRecipeIdResponse>
    {
        public int Id { get; set; }
    }
}

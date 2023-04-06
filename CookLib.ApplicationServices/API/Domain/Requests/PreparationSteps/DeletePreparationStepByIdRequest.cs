using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using MediatR;

namespace CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps
{
    public class DeletePreparationStepByIdRequest : RequestBase, IRequest<DeletePreparationStepByIdResponse>
    {
        public int Id { get; set; }
    }
}

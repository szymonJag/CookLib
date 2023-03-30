using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.PreparationSteps;
using CookLib.ApplicationServices.API.Domain.Responses.PreparationSteps;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.PreparationSteps;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.PreparationSteps
{
    public class AddPreparationStepHandler : IRequestHandler<AddPreparationStepRequest, AddPreparationStepResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public AddPreparationStepHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }
        public async Task<AddPreparationStepResponse> Handle(AddPreparationStepRequest request, CancellationToken cancellationToken)
        {
            var prepStep = this.mapper.Map<PreparationStep>(request);
            var command = new AddPreparationStepCommand() { Parameter = prepStep };
            var addedPrepStep = await this.commandExecutor.Execute(command);

            if (addedPrepStep == null)
            {
                return new AddPreparationStepResponse()
                {
                    Error = new ErrorModel(ErrorType.ValidationError)
                };
            }

            return new AddPreparationStepResponse()
            {
                Data = this.mapper.Map<PreparationStepDTO>(addedPrepStep);
        }
    }
}
}

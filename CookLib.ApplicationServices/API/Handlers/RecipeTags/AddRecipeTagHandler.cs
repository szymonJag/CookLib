using AutoMapper;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeTags;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using CookLib.ApplicationServices.API.ErrorHandling;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeTags;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeTags
{
    public class AddRecipeTagHandler : IRequestHandler<AddRecipeTagRequest, AddRecipeTagResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;

        public AddRecipeTagHandler(IMapper mapper, ICommandExecutor commandExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
        }
        public async Task<AddRecipeTagResponse> Handle(AddRecipeTagRequest request, CancellationToken cancellationToken)
        {
            var toAdd = this.mapper.Map<RecipeTag>(request);
            var command = new AddRecipeTagCommand() { Parameter = toAdd };
            var added = await this.commandExecutor.Execute(command);

            if (added == null)
            {
                return new AddRecipeTagResponse()
                {
                    Error = new ErrorModel(ErrorType.NotFound)
                };
            }

            return new AddRecipeTagResponse()
            {
                Data = this.mapper.Map<RecipeTagDTO>(added)
            };
        }
    }
}

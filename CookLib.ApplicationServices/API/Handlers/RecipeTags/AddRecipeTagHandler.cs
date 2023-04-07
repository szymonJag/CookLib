using AutoMapper;
using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Models;
using CookLib.ApplicationServices.API.Domain.Requests.RecipeTags;
using CookLib.ApplicationServices.API.Domain.Responses.RecipeTags;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Commands.RecipeTags;
using CookLib.DataAccess.CQRS.Queries;
using CookLib.DataAccess.CQRS.Queries.Recipes;
using CookLib.DataAccess.Entities;
using MediatR;

namespace CookLib.ApplicationServices.API.Handlers.RecipeTags
{
    public class AddRecipeTagHandler : IRequestHandler<AddRecipeTagRequest, AddRecipeTagResponse>
    {
        private readonly IMapper mapper;
        private readonly ICommandExecutor commandExecutor;
        private readonly IQueryExecutor queryExecutor;

        public AddRecipeTagHandler(IMapper mapper, ICommandExecutor commandExecutor, IQueryExecutor queryExecutor)
        {
            this.mapper = mapper;
            this.commandExecutor = commandExecutor;
            this.queryExecutor = queryExecutor;
        }
        public async Task<AddRecipeTagResponse> Handle(AddRecipeTagRequest request, CancellationToken cancellationToken)
        {
            var toAdd = this.mapper.Map<RecipeTag>(request);
            var query = new GetRecipeByIdQuery() { Id = request.RecipeId };
            var recipeTagsId = (await this.queryExecutor.Execute(query)).RecipeTags.Select(x => x.Tag.Id).ToList();

            if (recipeTagsId.Contains(toAdd.Tag.Id))
            {
                return new AddRecipeTagResponse()
                {
                    Error = new ErrorModel("Recipe already contains given tag!")
                };
            }

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

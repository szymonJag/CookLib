using CookLib.ApplicationServices.API.Domain.Requests;
using MediatR;

namespace CookLib.ApplicationServices;
public class ChangeRecipeStatusRequest : RequestBase, IRequest<ChangeRecipeStatusResponse>
{
    public int RecipeId { get; set; }
    public RecipeStatus NewStatus { get; set; }
}

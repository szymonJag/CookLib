using CookLib.ApplicationServices.API.Domain.ErrorHandling;
using CookLib.ApplicationServices.API.Domain.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace CookLib.Controllers
{
    public abstract class ApiControllerBase : ControllerBase
    {
        protected readonly IMediator mediator;

        protected ApiControllerBase(IMediator mediator)
        {
            this.mediator = mediator;
        }

        protected async Task<IActionResult> HandleRequest<TRequest, TResponse>(TRequest request) where TRequest : IRequest<TResponse> where TResponse : ErrorResponseBase
        {

            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(
                    this.ModelState
                        .Where(x => x.Value.Errors.Any())
                        .Select(x => new { property = x.Key, errors = x.Value.Errors }));
            }

            if (User.Claims.FirstOrDefault() != null)
            {
                (request as RequestBase).AuthenticatedUsername = this.User.FindFirstValue(ClaimTypes.Name);
                (request as RequestBase).AuthenticatedRole = this.User.FindFirstValue(ClaimTypes.Role);
                (request as RequestBase).AuthenticatedUserId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));
            }

            var response = await this.mediator.Send(request);


            if (response.Error != null)
            {
                return this.ErrorResponse(response.Error);
            }

            var res = this.Ok(response);

            return res;
        }

        private IActionResult ErrorResponse(ErrorModel errorModel)
        {
            var httpCode = GetHttpStatusCode(errorModel.Error);
            return StatusCode((int)httpCode, errorModel);
        }
        private static HttpStatusCode GetHttpStatusCode(string errorType)
        {
            switch (errorType)
            {
                case ErrorType.NotFound:
                    return HttpStatusCode.NotFound;
                case ErrorType.InternalServerError:
                    return HttpStatusCode.InternalServerError;
                case ErrorType.Unauthorized:
                    return HttpStatusCode.Forbidden;
                case ErrorType.RequestTooLarge:
                    return HttpStatusCode.RequestEntityTooLarge;
                case ErrorType.UnsupportedMediaType:
                    return HttpStatusCode.UnsupportedMediaType;
                case ErrorType.UnsupportedMethod:
                    return HttpStatusCode.MethodNotAllowed;
                case ErrorType.TooManyRequests:
                    return HttpStatusCode.TooManyRequests;
                default:
                    return HttpStatusCode.BadRequest;

            }
        }
    }
}

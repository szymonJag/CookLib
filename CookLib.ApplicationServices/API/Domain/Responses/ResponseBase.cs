using CookLib.ApplicationServices.API.ErrorHandling;

namespace CookLib.ApplicationServices.API.Domain.Responses
{
    public class ResponseBase<T> : ErrorResponseBase
    {
        public T Data { get; set; }
    }
}

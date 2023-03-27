namespace CookLib.ApplicationServices.API.Domain.Responses
{
    public class ErrorModel
    {
        public ErrorModel(string error)
        {
            Error = error;
        }

        public string Error { get; }
    }
}

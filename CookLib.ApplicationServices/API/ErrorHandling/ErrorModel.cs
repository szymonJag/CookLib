namespace CookLib.ApplicationServices.API.ErrorHandling
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

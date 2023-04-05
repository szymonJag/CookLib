namespace CookLib.ApplicationServices.API.Domain.Requests
{
    public class RequestBase
    {
        public string AuthenticatedUsername { get; set; }
        public string AuthenticatedRole { get; set; }
    }
}

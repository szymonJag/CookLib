using CookLib.DataAccess.Entities;

namespace CookLib.ApplicationServices.Components.Helpers
{
    public class HelperMethods : IHelperMethods
    {
        public bool IsAuthorOrAdmin(int userId, int authorId, string role)
        {

            return (userId == authorId || role == UserRole.Admin.ToString()) ? true : false;
        }
    }
}

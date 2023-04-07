namespace CookLib.ApplicationServices.Components.Helpers
{
    public interface IHelperMethods
    {
        bool IsAuthorOrAdmin(int userId, int authorId, string role);
    }
}

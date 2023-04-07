namespace CookLib.ApplicationServices.Components.Helpers
{
    public interface IHelperMethods
    {
        List<int> StringToIntList(string inputString, char separator);
        bool IsAuthorOrAdmin(int userId, int authorId, string role);
    }
}

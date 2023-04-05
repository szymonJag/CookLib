namespace CookLib.ApplicationServices.Components.PasswordHasher
{
    public interface IHasher
    {
        string SaltGenerator();
        string HashPassword(string password, string salt);
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CookLib.DataAccess
{
    class CookLibStorageContextFactory : IDesignTimeDbContextFactory<CookLibContext>
    {

        public CookLibContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CookLibContext>();
            optionsBuilder.UseSqlServer("Data Source=.\\SQLEXPRESS;Initial Catalog=CookLib;Integrated Security=True;TrustServerCertificate=True");

            return new CookLibContext(optionsBuilder.Options);
        }
    }
}

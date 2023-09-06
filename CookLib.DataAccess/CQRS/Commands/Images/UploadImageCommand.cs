using CookLib.DataAccess.Entities;

namespace CookLib.DataAccess.CQRS.Commands.Images
{

    public class UploadImageCommand : CommandBase<Image, Image>
    {
        public override async Task<Image> Execute(CookLibContext context)
        {
            await context.Images.AddAsync(this.Parameter);
            await context.SaveChangesAsync();
            return this.Parameter;
        }

    }
}

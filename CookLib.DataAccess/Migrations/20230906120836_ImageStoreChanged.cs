using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CookLib.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ImageStoreChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageContent",
                table: "Images");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Images");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageContent",
                table: "Images",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}

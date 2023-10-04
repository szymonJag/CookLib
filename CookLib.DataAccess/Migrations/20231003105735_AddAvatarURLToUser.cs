﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CookLib.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddAvatarURLToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarURL",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarURL",
                table: "Users");
        }
    }
}

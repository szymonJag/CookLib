using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CookLib.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class FavouriteRecipesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.CreateTable(
            //     name: "Ingredients",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
            //         Kcal = table.Column<int>(type: "int", nullable: false),
            //         Type = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Ingredients", x => x.Id);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Tags",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Tags", x => x.Id);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Users",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //         Username = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
            //         HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //         Salt = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //         CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //         AvatarURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //         Role = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Users", x => x.Id);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Recipes",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Name = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
            //         PreparationTime = table.Column<int>(type: "int", nullable: false),
            //         ServingSize = table.Column<int>(type: "int", nullable: false),
            //         CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //         AuthorId = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Recipes", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_Recipes_Users_AuthorId",
            //             column: x => x.AuthorId,
            //             principalTable: "Users",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Comments",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
            //         CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //         AuthorId = table.Column<int>(type: "int", nullable: false),
            //         RecipeId = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Comments", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_Comments_Recipes_RecipeId",
            //             column: x => x.RecipeId,
            //             principalTable: "Recipes",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_Comments_Users_AuthorId",
            //             column: x => x.AuthorId,
            //             principalTable: "Users",
            //             principalColumn: "Id");
            //     });

            migrationBuilder.CreateTable(
                name: "FavouriteRecipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RecipeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavouriteRecipes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FavouriteRecipes_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FavouriteRecipes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            // migrationBuilder.CreateTable(
            //     name: "Images",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         RecipeId = table.Column<int>(type: "int", nullable: false),
            //         ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Images", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_Images_Recipes_RecipeId",
            //             column: x => x.RecipeId,
            //             principalTable: "Recipes",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "PreparationSteps",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Step = table.Column<int>(type: "int", nullable: false),
            //         Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
            //         RecipeId = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_PreparationSteps", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_PreparationSteps_Recipes_RecipeId",
            //             column: x => x.RecipeId,
            //             principalTable: "Recipes",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "RecipeIngredients",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Amount = table.Column<int>(type: "int", nullable: false),
            //         Measurement = table.Column<int>(type: "int", nullable: false),
            //         RecipeId = table.Column<int>(type: "int", nullable: false),
            //         IngredientId = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_RecipeIngredients", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_RecipeIngredients_Ingredients_IngredientId",
            //             column: x => x.IngredientId,
            //             principalTable: "Ingredients",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_RecipeIngredients_Recipes_RecipeId",
            //             column: x => x.RecipeId,
            //             principalTable: "Recipes",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "RecipeTags",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         RecipeId = table.Column<int>(type: "int", nullable: false),
            //         TagId = table.Column<int>(type: "int", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_RecipeTags", x => x.Id);
            //         table.ForeignKey(
            //             name: "FK_RecipeTags_Recipes_RecipeId",
            //             column: x => x.RecipeId,
            //             principalTable: "Recipes",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_RecipeTags_Tags_TagId",
            //             column: x => x.TagId,
            //             principalTable: "Tags",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateIndex(
            //     name: "IX_Comments_AuthorId",
            //     table: "Comments",
            //     column: "AuthorId");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Comments_RecipeId",
            //     table: "Comments",
            //     column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_FavouriteRecipes_RecipeId",
                table: "FavouriteRecipes",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_FavouriteRecipes_UserId",
                table: "FavouriteRecipes",
                column: "UserId");
        }

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Images_RecipeId",
        //         table: "Images",
        //         column: "RecipeId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_PreparationSteps_RecipeId",
        //         table: "PreparationSteps",
        //         column: "RecipeId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_RecipeIngredients_IngredientId",
        //         table: "RecipeIngredients",
        //         column: "IngredientId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_RecipeIngredients_RecipeId",
        //         table: "RecipeIngredients",
        //         column: "RecipeId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Recipes_AuthorId",
        //         table: "Recipes",
        //         column: "AuthorId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_RecipeTags_RecipeId",
        //         table: "RecipeTags",
        //         column: "RecipeId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_RecipeTags_TagId",
        //         table: "RecipeTags",
        //         column: "TagId");
        // }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "FavouriteRecipes");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "PreparationSteps");

            migrationBuilder.DropTable(
                name: "RecipeIngredients");

            migrationBuilder.DropTable(
                name: "RecipeTags");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

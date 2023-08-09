using CookLib.ApplicationServices.API.Domain.Mappings;
using CookLib.ApplicationServices.API.Domain.Responses;
using CookLib.ApplicationServices.API.Domain.Validators.Ingredients;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.ApplicationServices.Components.PasswordHasher;
using CookLib.Authentication;
using CookLib.DataAccess;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Queries;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CookLibContext>(
    opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("CookLibDatabaseConnection"))
);

builder.Services.Configure<ApiBehaviorOptions>(opt =>
{
    opt.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddTransient<IHasher, Hasher>();
builder.Services.AddTransient<IQueryExecutor, QueryExecutor>();
builder.Services.AddTransient<ICommandExecutor, CommandExecutor>();
builder.Services.AddTransient<IHelperMethods, HelperMethods>();
builder.Services.AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

builder.Services.AddMvcCore()
    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AddIngredientRequestValidator>());


builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddAutoMapper(typeof(IngredientsProfile).Assembly);
builder.Services.AddMediatR(typeof(ResponseBase<>));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();



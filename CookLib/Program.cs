using CookLib.ApplicationServices.API.Domain.Responses;
using CookLib.ApplicationServices.API.Mappings;
using CookLib.ApplicationServices.API.Validators;
using CookLib.ApplicationServices.Components.Helpers;
using CookLib.DataAccess;
using CookLib.DataAccess.CQRS.Commands;
using CookLib.DataAccess.CQRS.Queries;
using FluentValidation.AspNetCore;
using MediatR;
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

builder.Services.AddTransient<IQueryExecutor, QueryExecutor>();
builder.Services.AddTransient<ICommandExecutor, CommandExecutor>();
builder.Services.AddTransient<IHelperMethods, HelperMethods>();

builder.Services.AddMvcCore()
    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AddIngredientRequestValidator>());


builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddAutoMapper(typeof(IngredientsProfile).Assembly);
builder.Services.AddMediatR(typeof(ResponseBase<>));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();



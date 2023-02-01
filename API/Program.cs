
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(MappingProfiles));
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StoreContext>(options => options.UseSqlite(connectionString)); 
builder.Services.AddApplicationServices();
builder.Services.AddSwaggerDocumention();
var app = builder.Build();

using (var scope = app.Services.CreateScope())
  {  
    var services = scope.ServiceProvider;
    var loggerFactory=services.GetRequiredService<ILoggerFactory>();
    try
    {
        var context = services.GetRequiredService<StoreContext>();
        context.Database.Migrate();
        await StoreContextSeed.SeedAsync(context,loggerFactory);
    }
    catch(Exception ex)
    {
      var logger=loggerFactory.CreateLogger<Program>();
      logger.LogError(ex,"An error occured during migration");
    }

}
 
app.UseMiddleware<ExceptionMiddleware>();
app.UseSwaggerDocumention();
// Configure the HTTP request pipeline.

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();

app.Run();

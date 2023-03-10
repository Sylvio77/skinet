using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumention(this IServiceCollection Services)
        {
            Services.AddSwaggerGen(c =>
          {
              c.SwaggerDoc("v1", new OpenApiInfo
              {
                  Title = "SkiNet API",
                  Version = "v1"
              });
          }
         );
            return Services;
        }

        public static IApplicationBuilder UseSwaggerDocumention(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkiNet API v1"); });
            return app;
        }
    }







}
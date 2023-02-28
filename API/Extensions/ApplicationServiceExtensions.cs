using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection Services)
        {
           Services.AddScoped<IproductRepository, ProductRepository>();
           Services.AddScoped<IBasketRepository, BasketRepository>();
           Services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
           Services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = ActionContext =>
           {
                var errors = ActionContext.ModelState
                .Where(e => e.Value.Errors.Count > 0)
                .SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage).ToArray();

                var errorResponse = new ApiValidationErrorResponse
                {
                    Errors = errors
                };
                return new BadRequestObjectResult(errorResponse);
            };
            }
            );
            return Services;
        }
    }
}
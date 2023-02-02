using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }
         public DbSet<Product>  Products {get;set;}
         public DbSet<ProductBrand>  ProductBrands {get;set;}
         public DbSet<ProductType>  ProductTypes {get;set;}

         protected override void OnModelCreating(ModelBuilder modelBuilder)
         {
           base.OnModelCreating(modelBuilder);
           modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
           if(Database.ProviderName=="Microsoft.EntityFrameworkCore.Sqlite")
           {
             foreach(var entyType in modelBuilder.Model.GetEntityTypes())
             {
               var proprerties=entyType.ClrType.GetProperties()
                               .Where(p=>p.PropertyType==typeof(decimal));
                 foreach(var proprerty in proprerties)
                 {
                  modelBuilder.Entity(entyType.Name).Property(proprerty.Name)
                  .HasConversion<double>();
                 }              

             }
           }
         }
    }
}





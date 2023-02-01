using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification
{
    public class ProdcutWithTypesAndBrandSpec:BaseSpecification<Product>
    {
        public ProdcutWithTypesAndBrandSpec()
        {
            AddInclude(x=>x.ProductBrand);
             AddInclude(x=>x.ProductType);
        }

        public ProdcutWithTypesAndBrandSpec(int id) 
        : base(x=>x.Id==id)
        {
            AddInclude(x=>x.ProductBrand);
            AddInclude(x=>x.ProductType);   
        }
    }
}
using Core.Entities;

namespace Core.Specification
{
    public class ProductWithFiltersForCountSpec:BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpec(ProductSpecParams productParams)
        :base(x=>
          (!productParams.BrandId.HasValue || x.ProductBrandId==productParams.BrandId) &&
          (!productParams.TypeId.HasValue || x.ProductTypeId==productParams.TypeId)
         )
        {

        }
    }
}